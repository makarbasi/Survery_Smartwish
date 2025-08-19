import { Module } from '@nestjs/common';
import { StoreInterestsService } from './store-interests.service';
import { StoreInterestsController } from './store-interests.controller';
import { SupabaseStorageService } from '../services/supabase-storage.service';

@Module({
  imports: [],
  providers: [StoreInterestsService, SupabaseStorageService],
  controllers: [StoreInterestsController],
  exports: [StoreInterestsService],
})
export class StoreInterestsModule {}
