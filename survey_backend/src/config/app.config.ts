import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  // Database Configuration
  database: {
    host: process.env.DB_HOST || 'db.lzeuerapdbrouxteluww.supabase.co',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME || 'postgres',
  },
  
  // Application Configuration
  port: parseInt(process.env.PORT || '3002'),
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // CORS Configuration
  cors: {
    origin: process.env.CORS_ORIGIN 
      ? process.env.CORS_ORIGIN.split(',')
      : ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5174'],
  },
  
  // Supabase Configuration
  supabase: {
    url: process.env.SUPABASE_URL || 'https://lzeuerapdbrouxteluww.supabase.co',
    anonKey: process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6ZXVlcmFwZGJyb3V4dGVsdXd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyNzQ1ODksImV4cCI6MjA3MDg1MDU4OX0.XSK3lQG30zEtIsP1hB9-akrTH0u9tC8eITzaWjSlKiU',
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  },
  
  // Security Configuration
  security: {
    helmetEnabled: process.env.HELMET_ENABLED !== 'false',
    rateLimit: {
      windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
      max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
    },
  },
  
  // File Upload Configuration
  upload: {
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760'),
    uploadPath: process.env.UPLOAD_PATH || './uploads',
  },
}));
