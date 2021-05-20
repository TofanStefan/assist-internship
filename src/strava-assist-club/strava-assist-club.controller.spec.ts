import { Test, TestingModule } from '@nestjs/testing';
import { StravaAssistClubController } from './strava-assist-club.controller';
import { StravaAssistClubService } from './strava-assist-club.service';

describe('StravaAssistClubController', () => {
  let controller: StravaAssistClubController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StravaAssistClubController],
      providers: [StravaAssistClubService],
    }).compile();

    controller = module.get<StravaAssistClubController>(StravaAssistClubController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
