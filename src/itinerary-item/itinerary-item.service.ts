import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItineraryItem } from './itinerary-item.entity';

@Injectable()
export class ItineraryItemService {
  constructor(
    @InjectRepository(ItineraryItem)
    private readonly itineraryItemRepository: Repository<ItineraryItem>,
  ) {}

  findAll(): Promise<ItineraryItem[]> {
    return this.itineraryItemRepository.find();
  }

  async findOne(id: string): Promise<ItineraryItem> {
    const item = await this.itineraryItemRepository.findOne({ where: { id } });
    if (!item) {
      throw new Error(`ItineraryItem with id ${id} not found`);
    }
    return item;
  }

  create(itineraryItem: ItineraryItem): Promise<ItineraryItem> {
    return this.itineraryItemRepository.save(itineraryItem);
  }

  async update(
    id: string,
    itineraryItem: ItineraryItem,
  ): Promise<ItineraryItem> {
    await this.itineraryItemRepository.update(id, itineraryItem);
    const updatedItem = await this.itineraryItemRepository.findOne({
      where: { id },
    });
    if (!updatedItem) {
      throw new Error(`ItineraryItem with id ${id} not found`);
    }
    return updatedItem;
  }

  async remove(id: string): Promise<void> {
    await this.itineraryItemRepository.delete(id);
  }
}
