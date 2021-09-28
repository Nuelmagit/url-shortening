import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { EncodeLongUrlResponse } from '../encoders/types/encode-long-url-response';
import { UrlEncoderService } from '../encoders/url-encoder.service';
import { StatisticsStorageService } from '../statistics/storage/statistics-storage.service';
import { URL_STATISTICS_KEY } from './statistics-keys';
import { StatisticsService } from './statistics.service';

const SHORT_URL = '84210vf731';
const LONG_URL = 'www.google.com';

export class FakeUrlEncoderService extends UrlEncoderService {
  encodeLongUrl(longUrl: string): EncodeLongUrlResponse {
    return { isNewEncoded: true, shortUrl: `short of ${longUrl}` };
  }

  decodeShortUrl(shortUrl: string) {
    return shortUrl === SHORT_URL ? LONG_URL : null;
  }
}

/**
 * TODO: exaustive tests
 */
describe('StatisticsService', () => {
  let urlEncoderService: UrlEncoderService;
  let statisticsStorageService: StatisticsStorageService;
  let statisticsService: StatisticsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StatisticsService,
        StatisticsStorageService,
        {
          provide: UrlEncoderService,
          useClass: FakeUrlEncoderService,
        },
      ],
    }).compile();

    urlEncoderService = module.get<UrlEncoderService>(UrlEncoderService);

    statisticsService = module.get<StatisticsService>(StatisticsService);

    statisticsStorageService = module.get<StatisticsStorageService>(
      StatisticsStorageService,
    );
  });

  it('StatisticsService - should be defined', () => {
    expect(statisticsService).toBeDefined();
  });

  it('should get statistics from statisticStorage', () => {
    const spy = jest.spyOn(statisticsStorageService, 'getStats');
    statisticsService.getStatistics();
    expect(spy).toHaveBeenCalled();
  });

  it('Should throw NotFoundException if the long url does not exist in the state', () => {
    expect(() =>
      statisticsService.getUrlStatistics('www.fakeurl.com'),
    ).toThrowError(NotFoundException);
  });

  it('should decode shortUrl to get url stats', () => {
    statisticsStorageService.set(URL_STATISTICS_KEY, {
      [LONG_URL]: {},
    });

    const spy = jest.spyOn(urlEncoderService, 'decodeShortUrl');

    statisticsService.getUrlStatistics(SHORT_URL);

    expect(spy).toHaveBeenCalledWith(SHORT_URL);
  });
});
