import { Injectable } from '@nestjs/common';
import { getSupabaseServiceClient } from '../config/supabase.config';

@Injectable()
export class SupabaseStorageService {
  private readonly bucketName = 'store-interest-images';

  async uploadImage(
    file: Express.Multer.File,
    storeInterestId: string,
  ): Promise<{ url: string; path: string }> {
    const supabase = getSupabaseServiceClient();
    
    // Generate unique filename
    const timestamp = Date.now();
    const randomSuffix = Math.round(Math.random() * 1e9);
    const fileExtension = file.originalname.split('.').pop();
    const fileName = `store_${storeInterestId}_${timestamp}_${randomSuffix}.${fileExtension}`;
    
    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(this.bucketName)
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Supabase storage upload error:', error);
      throw new Error(`Failed to upload image to Supabase: ${error.message}`);
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(this.bucketName)
      .getPublicUrl(fileName);

    console.log(`✅ Image uploaded to Supabase: ${fileName}`);
    console.log(`🔗 Public URL: ${urlData.publicUrl}`);

    return {
      url: urlData.publicUrl,
      path: fileName,
    };
  }

  async deleteImage(imagePath: string): Promise<void> {
    const supabase = getSupabaseServiceClient();
    
    const { error } = await supabase.storage
      .from(this.bucketName)
      .remove([imagePath]);

    if (error) {
      console.error('Supabase storage delete error:', error);
      throw new Error(`Failed to delete image from Supabase: ${error.message}`);
    }

    console.log(`✅ Image deleted from Supabase: ${imagePath}`);
  }

  async createBucketIfNotExists(): Promise<void> {
    try {
      const supabase = getSupabaseServiceClient();
      
      // Check if bucket exists
      const { data: buckets, error: listError } = await supabase.storage.listBuckets();
      
      if (listError) {
        console.error('Error listing buckets:', listError);
        console.log('⚠️  Bucket creation will be skipped due to listing error');
        return;
      }

      const bucketExists = buckets.some(bucket => bucket.name === this.bucketName);
      
      if (!bucketExists) {
        console.log(`🔄 Creating Supabase storage bucket: ${this.bucketName}`);
        
        // Create bucket with public access
        const { error: createError } = await supabase.storage.createBucket(this.bucketName, {
          public: true,
          allowedMimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
          fileSizeLimit: 10 * 1024 * 1024, // 10MB
        });

        if (createError) {
          console.error('❌ Error creating bucket:', createError);
          console.log('⚠️  Bucket creation failed, but app will continue');
          return;
        }

        console.log(`✅ Created Supabase storage bucket: ${this.bucketName}`);
      } else {
        console.log(`✅ Supabase storage bucket already exists: ${this.bucketName}`);
      }
    } catch (error) {
      console.error('❌ Unexpected error in bucket creation:', error);
      console.log('⚠️  Bucket creation failed, but app will continue');
    }
  }
}
