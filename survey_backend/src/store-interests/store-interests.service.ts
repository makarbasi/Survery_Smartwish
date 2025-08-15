import { Injectable, NotFoundException } from '@nestjs/common';
import { getSupabaseClient } from '../config/supabase.config';

interface CreateInterestDto {
  storeName: string;
  storeAddress: string;
  contactName: string;
  contactEmail?: string;
  contactPhone?: string;
  letterText?: string;
}

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

@Injectable()
export class StoreInterestsService {
  private get supabase() {
    return getSupabaseClient();
  }

  async createInterest(data: CreateInterestDto): Promise<StoreInterest> {
    console.log('Creating store interest:', data.storeName);
    
    // Transform camelCase to snake_case for database
    const dbData = {
      store_name: data.storeName,
      store_address: data.storeAddress,
      contact_name: data.contactName,
      contact_email: data.contactEmail,
      contact_phone: data.contactPhone,
      letter_text: data.letterText
    };
    
    const { data: interest, error } = await this.supabase
      .from('sw_store_interests')
      .insert([dbData])
      .select('id, store_name, store_address, contact_name, contact_email, contact_phone, letter_text, created_at, updated_at')
      .single();
    
    if (error) {
      console.error('Error creating store interest:', error);
      throw new Error(`Failed to create store interest: ${error.message}`);
    }
    
    console.log('Store interest created with ID:', interest.id);
    
    // Transform snake_case to camelCase for frontend compatibility
    return {
      id: interest.id,
      storeName: interest.store_name,
      storeAddress: interest.store_address,
      contactName: interest.contact_name,
      contactEmail: interest.contact_email,
      contactPhone: interest.contact_phone,
      letterText: interest.letter_text,
      createdAt: interest.created_at,
      updatedAt: interest.updated_at
    };
  }

  async listInterests(): Promise<StoreInterest[]> {
    console.log('Fetching all store interests...');
    
    const { data: interests, error } = await this.supabase
      .from('sw_store_interests')
      .select('id, store_name, store_address, contact_name, contact_email, contact_phone, letter_text, created_at, updated_at')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching store interests:', error);
      throw new Error(`Failed to fetch store interests: ${error.message}`);
    }
    
    // Transform snake_case to camelCase for frontend compatibility
    const transformedInterests = (interests || []).map(interest => ({
      id: interest.id,
      storeName: interest.store_name,
      storeAddress: interest.store_address,
      contactName: interest.contact_name,
      contactEmail: interest.contact_email,
      contactPhone: interest.contact_phone,
      letterText: interest.letter_text,
      createdAt: interest.created_at,
      updatedAt: interest.updated_at
    }));
    
    console.log(`Found ${transformedInterests.length} store interests`);
    return transformedInterests;
  }

  async getInterestById(id: string): Promise<StoreInterest> {
    console.log('Fetching store interest by ID:', id);
    
    const { data: interest, error } = await this.supabase
      .from('sw_store_interests')
      .select('id, store_name, store_address, contact_name, contact_email, contact_phone, letter_text, created_at, updated_at')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching store interest:', error);
      throw new Error(`Failed to fetch store interest: ${error.message}`);
    }
    
    if (!interest) {
      throw new NotFoundException('Store interest not found');
    }
    
    // Transform snake_case to camelCase for frontend compatibility
    return {
      id: interest.id,
      storeName: interest.store_name,
      storeAddress: interest.store_address,
      contactName: interest.contact_name,
      contactEmail: interest.contact_email,
      contactPhone: interest.contact_phone,
      letterText: interest.letter_text,
      createdAt: interest.created_at,
      updatedAt: interest.updated_at
    };
  }

  async addImage(interestId: string, imageUrl: string, originalName?: string): Promise<StoreInterestImage> {
    console.log('Adding image to store interest:', interestId);
    
    // Verify the interest exists
    await this.getInterestById(interestId);
    
    const { data: image, error } = await this.supabase
      .from('sw_store_interest_images')
      .insert([{
        store_interest_id: interestId,
        image_url: imageUrl,
        original_name: originalName
      }])
      .select('id, store_interest_id, image_url, original_name, created_at')
      .single();
    
    if (error) {
      console.error('Error adding image:', error);
      throw new Error(`Failed to add image: ${error.message}`);
    }
    
    console.log('Image added with ID:', image.id);
    
    // Transform snake_case to camelCase for frontend compatibility
    return {
      id: image.id,
      storeInterestId: image.store_interest_id,
      imageUrl: image.image_url,
      originalName: image.original_name,
      createdAt: image.created_at
    };
  }

  async getStats() {
    try {
      const { data: interests, error: interestsError } = await this.supabase
        .from('sw_store_interests')
        .select('id, store_name, contact_name, created_at');
      
      if (interestsError) {
        console.error('Error fetching interests for stats:', interestsError);
        throw interestsError;
      }
      
      const { data: images, error: imagesError } = await this.supabase
        .from('sw_store_interest_images')
        .select('id');
      
      if (imagesError) {
        console.error('Error fetching images for stats:', imagesError);
        throw imagesError;
      }
      
      const totalInterests = interests?.length || 0;
      const totalImages = images?.length || 0;
      
      // Transform snake_case to camelCase for frontend compatibility
      const recent = (interests || []).slice(0, 5).map(interest => ({
        id: interest.id,
        storeName: interest.store_name,
        contactName: interest.contact_name,
        createdAt: interest.created_at
      }));

      return {
        totalInterests,
        totalImages,
        recentSubmissions: recent
      };
    } catch (error) {
      console.error('Error getting stats:', error);
      return {
        totalInterests: 0,
        totalImages: 0,
        recentSubmissions: []
      };
    }
  }
}
