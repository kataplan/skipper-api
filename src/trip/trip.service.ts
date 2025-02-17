import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trip } from './trip.entity';

@Injectable()
export class TripService {
  constructor(
    @InjectRepository(Trip)
    private readonly tripRepository: Repository<Trip>,
  ) {}

  async create(trip: Trip): Promise<Trip> {
    return this.tripRepository.save(trip);
  }

  async findAll(): Promise<Trip[]> {
    return this.tripRepository.find({
      relations: ['owner', 'members', 'itineraryItems'],
    });
  }

  async findOne(id: string): Promise<Trip> {
    const trip = await this.tripRepository.findOne({
      where: { id },
      relations: ['owner', 'members', 'itineraryItems'],
    });
    if (!trip) {
      throw new Error(`Trip with id ${id} not found`);
    }
    return trip;
  }

  async update(id: string, trip: Trip): Promise<Trip> {
    await this.tripRepository.update(id, trip);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.tripRepository.delete(id);
  }
}
