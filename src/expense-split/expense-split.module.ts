import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseSplitService } from './expense-split.service';
import { ExpenseSplitController } from './expense-split.controller';
import { ExpenseSplit } from './expense-split.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExpenseSplit])],
  providers: [ExpenseSplitService],
  controllers: [ExpenseSplitController],
})
export class ExpenseSplitModule {}
