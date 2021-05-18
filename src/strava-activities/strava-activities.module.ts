import { Module } from '@nestjs/common';
import { StravaActivitiesService } from './strava-activities.service';
import { StravaActivitiesController } from './strava-activities.controller';

@Module({
  controllers: [StravaActivitiesController],
  providers: [StravaActivitiesService]
})
export class StravaActivitiesModule {}
