import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

const BAD_REQUEST_BODY = {
  statusCode: 400,
  message: ['shortUrl must contain only letters and numbers'],
  error: 'Bad Request',
};

const notFoundBody = (url: string) => {
  return {
    statusCode: 404,
    message: `${url} does not exist`,
    error: 'Not Found',
  };
};

const getShortUrl = (fullUrl: string) => {
  const urlAsArray = fullUrl.split('/');
  const shorUrlIndex = urlAsArray.length - 1;
  return urlAsArray[shorUrlIndex];
};

/**
 * TODO. exhaustive test
 */
describe('ShortUrlController - decode (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('Should return Bad request when empty body', () => {
    return request(app.getHttpServer())
      .post('/decode')
      .expect(400)
      .expect(BAD_REQUEST_BODY);
  });

  it('Should return Not found when short url is not valid / does not exist', () => {
    return request(app.getHttpServer())
      .post('/decode')
      .send({ shortUrl: 'abc' })
      .expect(404)
      .expect(notFoundBody('abc'));
  });

  it('Should return Bad request when url is empty', () => {
    return request(app.getHttpServer())
      .post('/decode')
      .send({ shortUrl: null })
      .expect(400)
      .expect(BAD_REQUEST_BODY);
  });

  it('Should return shortUrl in the response body', () => {
    const longUrl = 'https://www.google.com';

    const decodeTest = (shortUrl: string) => {
      return request(app.getHttpServer())
        .post('/decode')
        .send({ shortUrl: getShortUrl(shortUrl) })
        .expect(200)
        .expect({ longUrl });
    };

    return request(app.getHttpServer())
      .post('/encode')
      .send({ longUrl })
      .then((okResponse) => okResponse.body.shortUrl)
      .then(decodeTest);
  });
});
