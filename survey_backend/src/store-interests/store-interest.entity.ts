import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { StoreInterestImage } from './store-interest-image.entity';

@Entity('sw_store_interests')
export class StoreInterest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'store_name', type: 'varchar', length: 255 })
  storeName: string;

  @Column({ name: 'store_address', type: 'varchar', length: 500 })
  storeAddress: string;

  @Column({ name: 'contact_name', type: 'varchar', length: 255 })
  contactName: string;

  @Column({ name: 'contact_email', type: 'varchar', length: 255, nullable: true })
  contactEmail?: string;

  @Column({ name: 'contact_phone', type: 'varchar', length: 50, nullable: true })
  contactPhone?: string;

  @Column({ name: 'letter_text', type: 'text', nullable: true })
  letterText?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => StoreInterestImage, (image) => image.storeInterest, {
    cascade: true,
  })
  images: StoreInterestImage[];
}
