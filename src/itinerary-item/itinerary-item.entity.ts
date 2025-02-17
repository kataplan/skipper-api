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

@Entity()
export class ItineraryItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Trip, (trip) => trip.itineraryItems, { onDelete: 'CASCADE' })
  trip: Trip;

  @ManyToOne(() => User, { nullable: true })
  payer: User;

  @Column('decimal')
  amount: number;

  @Column()
  description: string;

  @Column({ type: 'text' })
  category: 'hospedaje' | 'transporte' | 'entrada';

  @Column({ nullable: true, type: 'timestamp' })
  arrivalTime?: Date;

  @Column({ nullable: true, type: 'timestamp' })
  departureTime?: Date;

  @OneToMany(() => ExpenseSplit, (split) => split.itineraryItem)
  expenseSplits: ExpenseSplit[];
}
