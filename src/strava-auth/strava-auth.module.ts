import { Module } from '@nestjs/common';
import { StravaAuthService } from './strava-auth.service';
import { StravaAuthController } from './strava-auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports : [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [StravaAuthController],
  providers: [StravaAuthService]
})
export class StravaAuthModule {}
