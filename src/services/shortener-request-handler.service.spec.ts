import { Test, TestingModule } from '@nestjs/testing';
import { EncoderModule } from './encoders/url-encoder.module';
import { ShortenerRequestHandler } from './shortener-request-handler.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
const FIRST_ENCODED_URL = '84210vf731';

describe('ShortenerRequestHandler', () => {
  let shortenerRequestHandler: ShortenerRequestHandler;
  const EXAMPLE_URL = 'www.google.com';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShortenerRequestHandler],
      imports: [EncoderModule, EventEmitterModule.forRoot()],
    }).compile();

    shortenerRequestHandler = module.get<ShortenerRequestHandler>(
      ShortenerRequestHandler,
    );
  });

  it('ShortenerRequestHandler - should be defined', () => {
    expect(shortenerRequestHandler).toBeDefined();
  });

  it('Should return first encoded url', () => {
    const encodedResponse = shortenerRequestHandler.handleEncode({
      longUrl: EXAMPLE_URL,
    });
    expect(encodedResponse.shortUrl).toBe(FIRST_ENCODED_URL);
  });

  it('Should decode short url', () => {
    const encodeResponse = shortenerRequestHandler.handleEncode({
      longUrl: EXAMPLE_URL,
    });

    const decodedResponse = shortenerRequestHandler.handleDecode({
      shortUrl: encodeResponse.shortUrl,
    });

    expect(decodedResponse.longUrl).toBe(EXAMPLE_URL);
  });
});
