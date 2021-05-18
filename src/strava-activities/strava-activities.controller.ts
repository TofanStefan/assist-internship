import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StravaActivitiesService } from './strava-activities.service';
import { CreateStravaActivityDto } from './dto/create-strava-activity.dto';
import { UpdateStravaActivityDto } from './dto/update-strava-activity.dto';

@Controller('strava-activities')
export class StravaActivitiesController {
  constructor(private readonly stravaActivitiesService: StravaActivitiesService) {}

  @Post()
  create(@Body() createStravaActivityDto: CreateStravaActivityDto) {
    return this.stravaActivitiesService.create(createStravaActivityDto);
  }

  @Get()
  findAll() {
    return this.stravaActivitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stravaActivitiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStravaActivityDto: UpdateStravaActivityDto) {
    return this.stravaActivitiesService.update(+id, updateStravaActivityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stravaActivitiesService.remove(+id);
  }
}
