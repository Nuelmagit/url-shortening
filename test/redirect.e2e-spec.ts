import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { UrlEncoderService } from 'src/services/encoders/url-encoder.service';

const LONG_URL = 'https://www.google.com';

const NOT_FOUND_BODY = {
  statusCode: 404,
  message: 'bad url',
  error: 'Not Found',
};

/**
 * TODO. exhaustive test
 */
describe('RedirectController (e2e)', () => {
  let app: INestApplication;

  const urlEncoderService = {
    decodeShortUrl: (shortUrl: string = null) =>
      shortUrl === 'badShortUrl' ? null : LONG_URL,

    encodeLongUrl: (longUrl: string) => null,
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(UrlEncoderService)
      .useValue(urlEncoderService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Should return Bad request short url does not exist', () => {
    return request(app.getHttpServer())
      .get('/badShortUrl')
      .expect(404)
      .expect(NOT_FOUND_BODY);
  });

  it('Should redirect to long url', () => {
    return request(app.getHttpServer())
      .get(`/goodShortUrl`)
      .expect(302)
      .expect('Location', LONG_URL);
  });
});
