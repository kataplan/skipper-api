import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripMember } from './trip-member.entity';
import { TripMemberService } from './trip-member.service';
import { TripMemberController } from './trip-member.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([TripMember]), AuthModule],
  providers: [TripMemberService],
  controllers: [TripMemberController],
})
export class TripMemberModule {}
