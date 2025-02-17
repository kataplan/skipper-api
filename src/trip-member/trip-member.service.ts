import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TripMember } from './trip-member.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TripMemberService {
  constructor(
    @InjectRepository(TripMember)
    private readonly tripMemberRepository: Repository<TripMember>,
  ) {}

  async create(tripMember: TripMember): Promise<TripMember> {
    return this.tripMemberRepository.save(tripMember);
  }

  async findAll(): Promise<TripMember[]> {
    return this.tripMemberRepository.find({ relations: ['trip', 'user'] });
  }

  async findOne(id: string): Promise<TripMember> {
    const tripMember = await this.tripMemberRepository.findOne({
      where: { id },
      relations: ['trip', 'user'],
    });
    if (!tripMember) {
      throw new Error(`TripMember with id ${id} not found`);
    }
    return tripMember;
  }

  async update(id: string, tripMember: TripMember): Promise<TripMember> {
    await this.tripMemberRepository.update(id, tripMember);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.tripMemberRepository.delete(id);
  }

  async findTripsByUser(@GetUser() user: User): Promise<TripMember[]> {
    return this.tripMemberRepository.find({
      where: { user },
      relations: ['trip'],
    });
  }
}
