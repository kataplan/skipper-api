import { User } from 'src/auth/user.entity';
import { ExpenseSplit } from 'src/expense-split/expense-split.entity';
import { Trip } from 'src/trip/trip.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ItineraryItemCategory } from './ItineraryItemCategory';

@Entity()
export class ItineraryItem {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Trip, (trip) => trip.itineraryItems, { onDelete: 'CASCADE' })
  trip!: Trip;

  @ManyToOne(() => User, { nullable: true })
  payer!: User;

  @Column('decimal')
  amount: number = 0;

  @Column()
  description: string = '';

  @Column({ type: 'text' })
  category: ItineraryItemCategory = ItineraryItemCategory.TRANSPORTATION;

  @Column({ nullable: true, type: 'timestamp' })
  arrivalTime?: Date;

  @Column({ nullable: true, type: 'timestamp' })
  departureTime?: Date;

  @OneToMany(() => ExpenseSplit, (split) => split.itineraryItem)
  expenseSplits?: ExpenseSplit[];
}
