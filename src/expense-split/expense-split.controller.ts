import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ExpenseSplitService } from './expense-split.service';
import { ExpenseSplit } from './expense-split.entity';

@Controller('expense-splits')
export class ExpenseSplitController {
  constructor(private readonly expenseSplitService: ExpenseSplitService) {}

  @Post()
  create(@Body() expenseSplit: ExpenseSplit): Promise<ExpenseSplit> {
    return this.expenseSplitService.create(expenseSplit);
  }

  @Get()
  findAll(): Promise<ExpenseSplit[]> {
    return this.expenseSplitService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ExpenseSplit> {
    return this.expenseSplitService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() expenseSplit: ExpenseSplit,
  ): Promise<ExpenseSplit> {
    return this.expenseSplitService.update(id, expenseSplit);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.expenseSplitService.remove(id);
  }
}
