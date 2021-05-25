import { ForbiddenException, Injectable } from '@nestjs/common';
import { StravaAuthService } from 'src/strava-auth/strava-auth.service';
import { CreateStravaAssistClubDto } from './dto/create-strava-assist-club.dto';
import { UpdateStravaAssistClubDto } from './dto/update-strava-assist-club.dto';
const strava = require('strava-v3')

@Injectable()
export class StravaAssistClubService {
  constructor(private readonly stravaAuthService: StravaAuthService){}

 async  getClubInfo(strava_id : number) {
   try{
    const club = await strava.clubs.get({id:process.env.STRAVA_ASSIST_CLUB_ID,access_token:await this.stravaAuthService.getAccessToken(strava_id)})
    console.log(club);
    return club;
   }catch(error){
     throw new ForbiddenException(error);
   }
    
  }

  async getMembers(strava_id : number) {
    try{
      const members = await strava.clubs.listMembers(
        { id:process.env.STRAVA_ASSIST_CLUB_ID,
          per_page :200,
          access_token:await this.stravaAuthService.getAccessToken(strava_id)
        })
      console.log(members);
      return members;
     }catch(error){
       throw new ForbiddenException(error);
     }
  }

  
async getActivities(strava_id : number , page_number :number){

  try{
    const activities = await strava.clubs.listActivities({
      id: process.env.STRAVA_ASSIST_CLUB_ID,
      access_token: await this.stravaAuthService.getAccessToken(strava_id),
      per_page: 50,
      page:page_number
      
    })
    return activities;

  }catch(error){
    throw new ForbiddenException(error);
  }
  
}

}
