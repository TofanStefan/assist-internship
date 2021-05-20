import { Test, TestingModule } from '@nestjs/testing';
import { StravaAssistClubService } from './strava-assist-club.service';

describe('StravaAssistClubService', () => {
  let service: StravaAssistClubService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StravaAssistClubService],
    }).compile();

    service = module.get<StravaAssistClubService>(StravaAssistClubService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
