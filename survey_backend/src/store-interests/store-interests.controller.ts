import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  UploadedFiles,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import * as fs from 'fs';
import * as path from 'path';
import { StoreInterestsService } from './store-interests.service';

// Import types from the service
interface StoreInterest {
  id: string;
  storeName: string;
  storeAddress: string;
  contactName: string;
  contactEmail?: string;
  contactPhone?: string;
  letterText?: string;
  createdAt: string;
  updatedAt: string;
  images?: StoreInterestImage[];
}

interface StoreInterestImage {
  id: string;
  storeInterestId: string;
  imageUrl: string;
  originalName?: string;
  createdAt: string;
}

@Controller('store-interests')
export class StoreInterestsController {
  constructor(private readonly service: StoreInterestsService) {}

  @Post()
  async submitInterest(
    @Body()
    body: {
      storeName: string;
      storeAddress: string;
      contactName: string;
      contactEmail?: string;
      contactPhone?: string;
    },
  ): Promise<StoreInterest> {
    console.log('Received store interest submission:', body.storeName);

    // Validate required fields
    if (!body.storeName || !body.storeAddress || !body.contactName) {
      throw new BadRequestException('Please fill in the store name, address, and contact person fields');
    }

    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const letterText = `Hi there! 👋

We'd love to hear from you about SmartWish!

SmartWish is an AI-powered greeting card kiosk that helps customers create personalized cards right in your store. It's a fun way to boost sales and give your customers something unique.

We're reaching out because we think your store might be a great fit for this technology.

What happens next?
• We'll get in touch to tell you more about SmartWish
• Show you how it works
• Discuss how it could fit in your store
• Talk about potential benefits for your business

No pressure - this is just to see if you're interested in learning more!

Store Information:
• Store Name: ${body.storeName}
• Address: ${body.storeAddress}
• Contact Person: ${body.contactName}${body.contactEmail ? `\n• Email: ${body.contactEmail}` : ''}${body.contactPhone ? `\n• Phone: ${body.contactPhone}` : ''}

Thanks for your time! We'll be in touch soon.

Best regards,
The SmartWish Team

---
Submitted on ${currentDate}`;

    const created = await this.service.createInterest({ ...body, letterText });
    console.log('Store interest submitted successfully:', created.id);
    return created;
  }

  @Get()
  async list(): Promise<StoreInterest[]> {
    console.log('Fetching all store interests');
    return this.service.listInterests();
  }

  @Get('with-images')
  async listWithImages(): Promise<StoreInterest[]> {
    console.log('Fetching all store interests with images');
    return this.service.listInterestsWithImages();
  }

  @Get('stats')
  async getStats() {
    console.log('Fetching store interests statistics');
    return this.service.getStats();
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<StoreInterest> {
    console.log('Fetching store interest:', id);
    return this.service.getInterestById(id);
  }

  @Get(':id/images')
  async getImages(@Param('id') id: string): Promise<StoreInterestImage[]> {
    console.log('Fetching images for store interest:', id);
    return this.service.getImagesByInterestId(id);
  }

  @Post(':id/images')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          const uploadDir = path.join(process.cwd(), 'uploads', 'store-interests');
          if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
          }
          cb(null, uploadDir);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `store_${req.params.id}_${uniqueSuffix}_${file.originalname}`);
        },
      }),
      limits: { fileSize: 10 * 1024 * 1024 },
      fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) return cb(null, true);
        return cb(new Error('Only image files are allowed'), false);
      },
    }),
  )
  async uploadImages(
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<{ images: StoreInterestImage[] }> {
    console.log(`Uploading ${files.length} images for store interest:`, id);
    
    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded');
    }

    const results = [] as StoreInterestImage[];
    for (const file of files) {
      // Use filename instead of path for newer multer versions
      const filename = file.filename || path.basename(file.path || '');
      
      // Generate full URL for production
      const baseUrl = process.env.NODE_ENV === 'production' 
        ? process.env.BACKEND_BASE_URL || 'https://smartwish-survey-backend.onrender.com'
        : 'http://localhost:3002';
      
      const publicUrl = `${baseUrl}/uploads/store-interests/${filename}`;
      
      console.log(`Saving image: ${filename} with URL: ${publicUrl}`);
      
      const saved = await this.service.addImage(id, publicUrl, file.originalname);
      results.push(saved);
    }
    
    console.log(`Successfully uploaded ${results.length} images`);
    return { images: results };
  }
}
