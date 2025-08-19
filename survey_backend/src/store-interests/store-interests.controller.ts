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
import { StoreInterestsService } from './store-interests.service';
import { SupabaseStorageService } from '../services/supabase-storage.service';

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
  constructor(
    private readonly service: StoreInterestsService,
    private readonly storageService: SupabaseStorageService,
  ) {}

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
      storage: multer.memoryStorage(), // Store in memory temporarily
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

    // Ensure storage bucket exists
    await this.storageService.createBucketIfNotExists();

    const results = [] as StoreInterestImage[];
    for (const file of files) {
      try {
        // Upload to Supabase Storage
        const { url: publicUrl } = await this.storageService.uploadImage(file, id);
        
        console.log(`✅ Image uploaded to Supabase: ${file.originalname}`);
        console.log(`🔗 Public URL: ${publicUrl}`);
        
        // Save image reference to database
        const saved = await this.service.addImage(id, publicUrl, file.originalname);
        results.push(saved);
      } catch (error) {
        console.error(`❌ Failed to upload image ${file.originalname}:`, error);
        throw new BadRequestException(`Failed to upload image: ${error.message}`);
      }
    }
    
    console.log(`✅ Successfully uploaded ${results.length} images to Supabase`);
    return { images: results };
  }
}
