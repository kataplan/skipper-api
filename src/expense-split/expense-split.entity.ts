import { User } from 'src/auth/user.entity';
import { ItineraryItem } from 'src/itinerary-item/itinerary-item.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';

@Entity()
export class ExpenseSplit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ItineraryItem, (item) => item.expenseSplits, {
    onDelete: 'CASCADE',
  })
  itineraryItem: ItineraryItem;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @Column('decimal')
  amountDue: number;

  @Column({ default: false })
  isPaid: boolean;
}
