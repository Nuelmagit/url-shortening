import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { StatisticsService } from 'src/services/statistics/statistics.service';

const BAD_REQUEST_BODY = {
  statusCode: 400,
  message: ['longUrl must be an URL address'],
  error: 'Bad Request',
};

const FIRST_URL_RESPONSE_BODY = { shortUrl: '84210vf731' };

describe('StatisticController (e2e)', () => {
  let app: INestApplication;
  let statisticsService = {
    getStatistics: () => {
      return { test: 'test123' };
    },

    getUrlStatistics: (longUrl: string) => {
      return { [longUrl]: { test: 'test123' } };
    },
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(StatisticsService)
      .useValue(statisticsService)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('Should return statistics', () => {
    return request(app.getHttpServer())
      .get('/statistic')
      .expect(200)
      .expect(statisticsService.getStatistics());
  });

  it('Should return given url statistics', () => {
    const shortUrl = '12345';
    return request(app.getHttpServer())
      .get(`/statistic/${shortUrl}`)
      .expect(200)
      .expect(statisticsService.getUrlStatistics(shortUrl));
  });
});
