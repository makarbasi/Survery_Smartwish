import { Module } from '@nestjs/common';
import { StoreInterestsService } from './store-interests.service';
import { StoreInterestsController } from './store-interests.controller';

@Module({
  imports: [],
  providers: [StoreInterestsService],
  controllers: [StoreInterestsController],
  exports: [StoreInterestsService],
})
export class StoreInterestsModule {}
