import { StoreInterestImage } from './store-interest-image.entity';
export declare class StoreInterest {
    id: string;
    storeName: string;
    storeAddress: string;
    contactName: string;
    contactEmail?: string;
    contactPhone?: string;
    letterText?: string;
    createdAt: Date;
    updatedAt: Date;
    images: StoreInterestImage[];
}
