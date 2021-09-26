import { EncodeLongUrlResponse } from './types/encode-long-url-response';

export abstract class UrlEncoderService {
  abstract encodeLongUrl(longUrl: string): EncodeLongUrlResponse;

  abstract decodeShortUrl(shortUrl: string);
}
