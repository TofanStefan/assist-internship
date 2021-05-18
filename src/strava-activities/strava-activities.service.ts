import { Injectable } from '@nestjs/common';
import { CreateStravaActivityDto } from './dto/create-strava-activity.dto';
import { UpdateStravaActivityDto } from './dto/update-strava-activity.dto';

@Injectable()
export class StravaActivitiesService {
  create(createStravaActivityDto: CreateStravaActivityDto) {
    return 'This action adds a new stravaActivity';
  }

  findAll() {
    return `This action returns all stravaActivities`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stravaActivity`;
  }

  update(id: number, updateStravaActivityDto: UpdateStravaActivityDto) {
    return `This action updates a #${id} stravaActivity`;
  }

  remove(id: number) {
    return `This action removes a #${id} stravaActivity`;
  }
}
