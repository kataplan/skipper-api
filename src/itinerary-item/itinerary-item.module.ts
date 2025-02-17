import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItineraryItem } from './itinerary-item.entity';
import { ItineraryItemService } from './itinerary-item.service';
import { ItineraryItemController } from './itineray-item.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ItineraryItem])],
  providers: [ItineraryItemService],
  controllers: [ItineraryItemController],
})
export class ItineraryItemModule {}
