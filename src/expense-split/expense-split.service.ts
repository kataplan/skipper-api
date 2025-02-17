import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExpenseSplit } from './expense-split.entity';

@Injectable()
export class ExpenseSplitService {
  constructor(
    @InjectRepository(ExpenseSplit)
    private readonly expenseSplitRepository: Repository<ExpenseSplit>,
  ) {}

  async create(expenseSplit: ExpenseSplit): Promise<ExpenseSplit> {
    return this.expenseSplitRepository.save(expenseSplit);
  }

  async findAll(): Promise<ExpenseSplit[]> {
    return this.expenseSplitRepository.find();
  }

  async findOne(id: string): Promise<ExpenseSplit> {
    const expenseSplit = await this.expenseSplitRepository.findOne({
      where: { id },
    });
    if (!expenseSplit) {
      throw new Error(`ExpenseSplit with id ${id} not found`);
    }
    return expenseSplit;
  }

  async update(id: string, expenseSplit: ExpenseSplit): Promise<ExpenseSplit> {
    await this.expenseSplitRepository.update(id, expenseSplit);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.expenseSplitRepository.delete(id);
  }
}
