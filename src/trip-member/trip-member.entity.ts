import { User } from 'src/auth/user.entity';
import { Trip } from 'src/trip/trip.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';

@Entity()
export class TripMember {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Trip, (trip) => trip.members, { onDelete: 'CASCADE' })
  trip: Trip;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  role: 'owner' | 'guest';
}
