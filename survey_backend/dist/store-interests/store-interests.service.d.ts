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
export declare class StoreInterestsService {
    private get supabase();
    createInterest(data: CreateInterestDto): Promise<StoreInterest>;
    listInterests(): Promise<StoreInterest[]>;
    getInterestById(id: string): Promise<StoreInterest>;
    addImage(interestId: string, imageUrl: string, originalName?: string): Promise<StoreInterestImage>;
    getStats(): Promise<{
        totalInterests: any;
        totalImages: any;
        recentSubmissions: any;
    }>;
}
export {};
