import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StravaAuthService } from 'src/strava-auth/strava-auth.service';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateStravaActivityDto } from './dto/create-strava-activity.dto';
import { UpdateStravaActivityDto } from './dto/update-strava-activity.dto';
const strava = require('strava-v3')

@Injectable()
export class StravaActivitiesService {
  constructor(
    @InjectRepository(User) private readonly userRepository : Repository<User>,private readonly stravaAuthService: StravaAuthService){}
  create(createStravaActivityDto: CreateStravaActivityDto) {
    return 'This action adds a new stravaActivity';
  }


  // user id 
 async findAll(strava_id : number)  {

   // get access token 
    const access_token =  await this.stravaAuthService.getAccessToken(strava_id);

    // try getting  all activities 

    try{

      const activities = await strava.athlete.listActivities({ access_token })
      console.log(activities)
      return activities

    }catch(error){
      
      // if access token fails = > throw error => catch in controller = > redirect to auth
      throw new ForbiddenException(error);
    }
  }

  
}
