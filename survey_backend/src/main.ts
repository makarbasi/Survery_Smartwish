import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();

import * as bodyParser from 'body-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as fs from 'fs';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';

console.log('=== SURVEY BACKEND STARTUP - ' + new Date().toISOString());

async function bootstrap() {
  console.log('Survey Backend starting...');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Security middleware - temporarily disabled to fix image loading
  if (false && process.env.HELMET_ENABLED !== 'false') {
    app.use(helmet.default({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", "data:", "https:", "http://localhost:3002", "http://localhost:5173", "http://localhost:5174"],
          connectSrc: ["'self'", "http://localhost:3002", "http://localhost:5173", "http://localhost:5174"],
          fontSrc: ["'self'"],
          objectSrc: ["'none'"],
          mediaSrc: ["'self'"],
          frameSrc: ["'none'"],
        },
      },
      hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
      },
      noSniff: true,
      referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
    }));
  }

  // Rate limiting
  const globalRateLimit = rateLimit.default({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000') || 15 * 60 * 1000,
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100') || 100,
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: false,
    keyGenerator: (req: any) => {
      return req.ip || req.connection?.remoteAddress || 'unknown';
    }
  });

  app.use(globalRateLimit);

  // Create uploads directory
  const uploadsDir = join(process.cwd(), 'uploads');
  const storeImagesDir = join(uploadsDir, 'store-interests');

  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  if (!fs.existsSync(storeImagesDir)) {
    fs.mkdirSync(storeImagesDir, { recursive: true });
  }

  // Serve static files with CORS headers
  app.useStaticAssets(uploadsDir, {
    prefix: '/uploads/',
    setHeaders: (res, path) => {
      res.set('Access-Control-Allow-Origin', '*');
      res.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
      res.set('Access-Control-Allow-Headers', 'Content-Type');
    }
  });

  // CORS configuration
  const allowedOrigins = process.env.CORS_ORIGIN 
    ? process.env.CORS_ORIGIN.split(',')
    : ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5174'];

  const corsConfig = {
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400,
  };

  app.enableCors(corsConfig);

  console.log('CORS Configuration:', {
    environment: process.env.NODE_ENV,
    allowedOrigins: corsConfig.origin,
  });

  // Increase payload size limits
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  const port = process.env.PORT ?? 3002;
  console.log('About to listen on port:', port);
  
  await app.listen(port, '0.0.0.0');
  console.log(`🚀 Survey Backend is running on http://localhost:${port}`);
  console.log('Survey Backend startup complete.');
}

bootstrap();
