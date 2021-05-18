import { PartialType } from '@nestjs/mapped-types';
import { CreateStravaAuthDto } from './create-strava-auth.dto';

export class UpdateStravaAuthDto extends PartialType(CreateStravaAuthDto) {}
