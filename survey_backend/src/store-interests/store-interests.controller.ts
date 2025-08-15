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
      throw new BadRequestException('Store name, address, and contact name are required');
    }

    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const letterText = `LETTER OF INTEREST
Store Partnership Program

Date: ${currentDate}

SmartWish Partnership Team
partnerships@smartwish.com

RE: Expression of Interest for Retail Partnership

Dear SmartWish Partnership Team,

I am writing on behalf of ${body.storeName}, located at ${body.storeAddress}, to formally express our strong interest in becoming an authorized retail partner for SmartWish's innovative digital greeting card technology platform.

After reviewing your partnership program, we believe that SmartWish's cutting-edge digital card creation technology would be an excellent addition to our retail offerings and would provide significant value to our customer base.

Store Information:
• Business Name: ${body.storeName}
• Location: ${body.storeAddress}
• Primary Contact: ${body.contactName}${body.contactEmail ? `\n• Email: ${body.contactEmail}` : ''}${body.contactPhone ? `\n• Phone: ${body.contactPhone}` : ''}

We are particularly interested in:
- Exploring exclusive territory rights for our market area
- Understanding the revenue-sharing structure and profit margins
- Learning about the implementation timeline and setup requirements
- Receiving comprehensive training and marketing support materials

Our establishment has a proven track record of successfully introducing innovative products to our market, and we are confident that we can effectively represent the SmartWish brand while driving meaningful sales growth.

We would welcome the opportunity to discuss this partnership in greater detail at your earliest convenience. Please let us know the next steps in your partnership evaluation process.

Thank you for considering our application. We look forward to the possibility of joining the SmartWish retail network and contributing to your continued success.

Sincerely,

${body.contactName}
${body.storeName}

---
This letter of interest was submitted through the SmartWish Partnership Portal on ${currentDate}.`;

    const created = await this.service.createInterest({ ...body, letterText });
    console.log('Store interest submitted successfully:', created.id);
    return created;
  }

  @Get()
  async list(): Promise<StoreInterest[]> {
    console.log('Fetching all store interests');
    return this.service.listInterests();
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
      const publicUrl = `/uploads/store-interests/${path.basename(file.path)}`;
      const saved = await this.service.addImage(id, publicUrl, file.originalname);
      results.push(saved);
    }
    
    console.log(`Successfully uploaded ${results.length} images`);
    return { images: results };
  }
}
