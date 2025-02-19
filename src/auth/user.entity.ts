import { Trip } from 'src/trip/trip.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ default: false })
  emailVerified: boolean = false;

  @Column({ nullable: true })
  emailVerificationCode?: string;

  @Column({ nullable: true })
  profilePicture?: string;

  @OneToMany(() => Trip, (trip) => trip.owner)
  trips?: Trip[];
}
