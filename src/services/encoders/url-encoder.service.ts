export abstract class UrlEncoderService {
  abstract encodeLongUrl(longUrl: string);

  abstract decodeShortUrl(shortUrl: string);
}
