"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreInterestsService = void 0;
const common_1 = require("@nestjs/common");
const supabase_config_1 = require("../config/supabase.config");
let StoreInterestsService = class StoreInterestsService {
    get supabase() {
        return (0, supabase_config_1.getSupabaseClient)();
    }
    async createInterest(data) {
        console.log('Creating store interest:', data.storeName);
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
    async listInterests() {
        console.log('Fetching all store interests...');
        const { data: interests, error } = await this.supabase
            .from('sw_store_interests')
            .select('id, store_name, store_address, contact_name, contact_email, contact_phone, letter_text, created_at, updated_at')
            .order('created_at', { ascending: false });
        if (error) {
            console.error('Error fetching store interests:', error);
            throw new Error(`Failed to fetch store interests: ${error.message}`);
        }
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
    async getInterestById(id) {
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
            throw new common_1.NotFoundException('Store interest not found');
        }
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
    async addImage(interestId, imageUrl, originalName) {
        console.log('Adding image to store interest:', interestId);
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
        }
        catch (error) {
            console.error('Error getting stats:', error);
            return {
                totalInterests: 0,
                totalImages: 0,
                recentSubmissions: []
            };
        }
    }
};
exports.StoreInterestsService = StoreInterestsService;
exports.StoreInterestsService = StoreInterestsService = __decorate([
    (0, common_1.Injectable)()
], StoreInterestsService);
//# sourceMappingURL=store-interests.service.js.map