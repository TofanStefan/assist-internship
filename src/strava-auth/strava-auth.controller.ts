import { Controller, Get, Post, Body, Patch, Param, Delete,Res,Query } from '@nestjs/common';
import { StravaAuthService } from './strava-auth.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('strava-auth')
@Controller('strava-auth')
export class StravaAuthController {
  constructor(private readonly stravaAuthService: StravaAuthService) {}

 
  // builds uri and redirects to strava oauth
  @Get()
  async getAccess(@Res() res : any) {
    return res.redirect(await this.stravaAuthService.requestAccess());


  }

  // redirect from strava , gets code and builds refresh and access token => saves to db 
  // all done = > redirects to "is logged in page "
  @Get('/create')
  async saveAccess(@Res() res : any,@Query() query : any) {

    // if user does not authorize 
    if(query.error)
      return res.redirect("http://localhost:3000/?error=access_denied");

    // if user authorizes
    await this.stravaAuthService.saveAccess(query.code,query.scope)
    return res.redirect("http://localhost:3000/");
   
  }
}
