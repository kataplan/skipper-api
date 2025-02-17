import { User } from 'src/auth/user.entity';
import { ItineraryItem } from 'src/itinerary-item/itinerary-item.entity';
import { TripMember } from 'src/trip-member/trip-member.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Trip {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.trips, { onDelete: 'CASCADE' })
  owner: User;

  @OneToMany(() => TripMember, (member) => member.trip)
  members: TripMember[];

  @OneToMany(() => ItineraryItem, (item) => item.trip)
  itineraryItems: ItineraryItem[];

  @Column()
  currency: string;
}
