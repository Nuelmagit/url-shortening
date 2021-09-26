import { Test, TestingModule } from '@nestjs/testing';
import { EncoderModule } from './encoders/url-encoder.module';
import { ShortenerRequestHandler } from './shortener-request-handler.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { DECODE_EVENT, ENCODE_EVENT } from 'src/events/events';
import { UrlEncoderService } from './encoders/url-encoder.service';

const FIRST_ENCODED_URL = '84210vf731';

describe('ShortenerRequestHandler', () => {
  let shortenerRequestHandler: ShortenerRequestHandler;
  let eventEmitter: EventEmitter2;
  let urlEncoderService: UrlEncoderService;

  const EXAMPLE_URL = 'www.google.com';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShortenerRequestHandler],
      imports: [EncoderModule, EventEmitterModule.forRoot()],
    }).compile();

    shortenerRequestHandler = module.get<ShortenerRequestHandler>(
      ShortenerRequestHandler,
    );

    eventEmitter = module.get<EventEmitter2>(EventEmitter2);

    urlEncoderService = module.get<UrlEncoderService>(UrlEncoderService);
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

  it('Should emit encode event', () => {
    const spy = jest.spyOn(eventEmitter, 'emit');

    shortenerRequestHandler.handleEncode({
      longUrl: EXAMPLE_URL,
    });

    expect(spy).toBeCalledWith(ENCODE_EVENT, {
      encodedUrl: EXAMPLE_URL,
      recentlyEncoded: true,
    });
  });

  it('Should emit decode event', () => {
    const encodeResponse = shortenerRequestHandler.handleEncode({
      longUrl: EXAMPLE_URL,
    });

    const spy = jest.spyOn(eventEmitter, 'emit');

    shortenerRequestHandler.handleDecode({
      shortUrl: encodeResponse.shortUrl,
    });

    expect(spy).toBeCalledWith(DECODE_EVENT, {
      decodedUrl: EXAMPLE_URL,
    });
  });

  it('Should call encodeLongUrl of urlEncoderService with the longUrl', () => {
    const spy = jest.spyOn(urlEncoderService, 'encodeLongUrl');

    shortenerRequestHandler.handleEncode({
      longUrl: EXAMPLE_URL,
    });

    expect(spy).toBeCalledWith(EXAMPLE_URL);
  });

  it('Should call decodeShortUrl of urlEncoderService with the shortUrl', () => {
    const encodeResponse = shortenerRequestHandler.handleEncode({
      longUrl: EXAMPLE_URL,
    });

    const spy = jest.spyOn(urlEncoderService, 'decodeShortUrl');

    shortenerRequestHandler.handleDecode({
      shortUrl: encodeResponse.shortUrl,
    });

    expect(spy).toBeCalledWith(encodeResponse.shortUrl);
  });
});
