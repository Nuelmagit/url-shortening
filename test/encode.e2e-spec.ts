import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

const BAD_REQUEST_BODY = {
  statusCode: 400,
  message: ['longUrl must be an URL address'],
  error: 'Bad Request',
};

/**
 * TODO. exhaustive test
 */
describe('ShortUrlController - encode (e2e)', () => {
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
      .post('/encode')
      .expect(400)
      .expect(BAD_REQUEST_BODY);
  });

  it('Should return Bad request when url is not valid', () => {
    return request(app.getHttpServer())
      .post('/encode')
      .send({ longUrl: 'abc' })
      .expect(400)
      .expect(BAD_REQUEST_BODY);
  });

  it('Should return Bad request when url is empty', () => {
    return request(app.getHttpServer())
      .post('/encode')
      .send({ longUrl: null })
      .expect(400)
      .expect(BAD_REQUEST_BODY);
  });

  it('Should return Bad request when the url has no protocol', () => {
    return request(app.getHttpServer())
      .post('/encode')
      .send({ longUrl: 'www.google.com' })
      .expect(400)
      .expect(BAD_REQUEST_BODY);
  });

  it('Should return shortUrl in the response body', () => {
    return request(app.getHttpServer())
      .post('/encode')
      .send({ longUrl: 'https://www.google.com' })
      .expect(200)
      .then(({ body }) => expect(body.shortUrl).toBeTruthy());
  });
});
