import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { TripService } from './trip.service';
import { Trip } from './trip.entity';

@Controller('trips')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post()
  create(@Body() trip: Trip): Promise<Trip> {
    return this.tripService.create(trip);
  }

  @Get()
  findAll(): Promise<Trip[]> {
    return this.tripService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Trip> {
    return this.tripService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() trip: Trip): Promise<Trip> {
    return this.tripService.update(id, trip);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.tripService.remove(id);
  }
}
