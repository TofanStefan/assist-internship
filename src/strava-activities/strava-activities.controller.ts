import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Res, ForbiddenException, Redirect } from '@nestjs/common';
import { StravaActivitiesService } from './strava-activities.service';
import { CreateStravaActivityDto } from './dto/create-strava-activity.dto';
import { UpdateStravaActivityDto } from './dto/update-strava-activity.dto';
import strava from 'strava-v3';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('strava-activities')
@Controller('strava-activities')
export class StravaActivitiesController {
  constructor(private readonly stravaActivitiesService: StravaActivitiesService) {}

  @Post()
  create(@Body() createStravaActivityDto: CreateStravaActivityDto) {
    return this.stravaActivitiesService.create(createStravaActivityDto);
  }

  // gets all activities
  @Get(':strava_id')
  async findAll(@Res() res:any,@Param('strava_id',ParseIntPipe) strava_id : number) {

      const activities =  await this.stravaActivitiesService.findAll(strava_id);
      return res.send(activities)
  }
}
