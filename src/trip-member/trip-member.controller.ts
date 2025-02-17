import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { TripMemberService } from './trip-member.service';
import { TripMember } from './trip-member.entity';

@Controller('trip-members')
export class TripMemberController {
  constructor(private readonly tripMemberService: TripMemberService) {}

  @Post()
  create(@Body() tripMember: TripMember): Promise<TripMember> {
    return this.tripMemberService.create(tripMember);
  }

  @Get()
  findAll(): Promise<TripMember[]> {
    return this.tripMemberService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<TripMember> {
    return this.tripMemberService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() tripMember: TripMember,
  ): Promise<TripMember> {
    return this.tripMemberService.update(id, tripMember);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.tripMemberService.remove(id);
  }
}
