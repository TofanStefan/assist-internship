import { PartialType } from '@nestjs/mapped-types';
import { CreateStravaActivityDto } from './create-strava-activity.dto';

export class UpdateStravaActivityDto extends PartialType(CreateStravaActivityDto) {}
