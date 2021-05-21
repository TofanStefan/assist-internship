import { PartialType } from '@nestjs/swagger';
import { CreateStravaAssistClubDto } from './create-strava-assist-club.dto';

export class UpdateStravaAssistClubDto extends PartialType(CreateStravaAssistClubDto) {}
