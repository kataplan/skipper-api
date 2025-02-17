import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ItineraryItemService } from './itinerary-item.service';
import { ItineraryItem } from './itinerary-item.entity';

@Controller('itinerary-items')
export class ItineraryItemController {
  constructor(private readonly itineraryItemService: ItineraryItemService) {}

  @Get()
  findAll(): Promise<ItineraryItem[]> {
    return this.itineraryItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ItineraryItem> {
    return this.itineraryItemService.findOne(id);
  }

  @Post()
  create(@Body() itineraryItem: ItineraryItem): Promise<ItineraryItem> {
    return this.itineraryItemService.create(itineraryItem);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() itineraryItem: ItineraryItem,
  ): Promise<ItineraryItem> {
    return this.itineraryItemService.update(id, itineraryItem);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.itineraryItemService.remove(id);
  }
}
