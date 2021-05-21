import { Module } from '@nestjs/common';
import { StravaAssistClubService } from './strava-assist-club.service';
import { StravaAssistClubController } from './strava-assist-club.controller';
import { StravaAuthService } from 'src/strava-auth/strava-auth.service';
import { User } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([User])],
  controllers: [StravaAssistClubController],
  providers: [StravaAssistClubService,StravaAuthService]
})
export class StravaAssistClubModule {}
