import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { StravaAssistClubService } from './strava-assist-club.service';
import { CreateStravaAssistClubDto } from './dto/create-strava-assist-club.dto';
import { UpdateStravaAssistClubDto } from './dto/update-strava-assist-club.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StravaAuthService } from 'src/strava-auth/strava-auth.service';

@Controller('strava-assist-club')
export class StravaAssistClubController {
  constructor(private readonly stravaAssistClubService: StravaAssistClubService) {}

  
  @Get(':strava_id')
  async getClubInfo(@Param('strava_id',ParseIntPipe) strava_id: number) {
    
    return await this.stravaAssistClubService.getClubInfo(strava_id);
  }

  @Get(':strava_id/members')
  async getClubMembers(@Param('strava_id') id: number) {
    return this.stravaAssistClubService.getMembers(id);
  }
}
