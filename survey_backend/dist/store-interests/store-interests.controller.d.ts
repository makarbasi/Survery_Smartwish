import { StoreInterestsService } from './store-interests.service';
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
export declare class StoreInterestsController {
    private readonly service;
    constructor(service: StoreInterestsService);
    submitInterest(body: {
        storeName: string;
        storeAddress: string;
        contactName: string;
        contactEmail?: string;
        contactPhone?: string;
    }): Promise<StoreInterest>;
    list(): Promise<StoreInterest[]>;
    listWithImages(): Promise<StoreInterest[]>;
    getStats(): Promise<{
        totalInterests: any;
        totalImages: any;
        recentSubmissions: any;
    }>;
    getOne(id: string): Promise<StoreInterest>;
    getImages(id: string): Promise<StoreInterestImage[]>;
    uploadImages(id: string, files: Express.Multer.File[]): Promise<{
        images: StoreInterestImage[];
    }>;
}
export {};
