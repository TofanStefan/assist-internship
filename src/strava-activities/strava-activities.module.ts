import { Module } from '@nestjs/common';
import { StravaActivitiesService } from './strava-activities.service';
import { StravaActivitiesController } from './strava-activities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { StravaAuthService } from 'src/strava-auth/strava-auth.service';

@Module({
  imports:[TypeOrmModule.forFeature([User])],
  controllers: [StravaActivitiesController],
  providers: [StravaActivitiesService,StravaAuthService]
})
export class StravaActivitiesModule {}
