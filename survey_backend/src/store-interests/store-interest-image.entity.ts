import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { StoreInterest } from './store-interest.entity';

@Entity('sw_store_interest_images')
export class StoreInterestImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => StoreInterest, (storeInterest) => storeInterest.images, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'store_interest_id' })
  storeInterest: StoreInterest;

  @Column({ name: 'image_url', type: 'varchar', length: 1024 })
  imageUrl: string;

  @Column({ name: 'original_name', type: 'varchar', length: 255, nullable: true })
  originalName?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
