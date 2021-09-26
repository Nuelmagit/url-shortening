import { Inject } from '@nestjs/common';
import { ALLOWED_ENCODING_CHARACTERS } from '../constants/allowed-encoding-characters';
import { EncodeLongUrlResponse } from '../types/encode-long-url-response';
import { UrlEncoderService } from '../url-encoder.service';
import { UrlStorage } from './url-storages/implementations/url-storage';
import { LONG_URL_STORAGE_TOKEN } from './url-storages/long-url-storage.token';
import { SHORT_URL_STORAGE_TOKEN } from './url-storages/short-url-storage.token';
import { UrlToNumberTransformer } from './url-to-number-transformers/url-to-number-transformer';

export class StorageBasedEncoder extends UrlEncoderService {
  constructor(
    private readonly urlToNumberTransformer: UrlToNumberTransformer,
    @Inject(SHORT_URL_STORAGE_TOKEN)
    private readonly shortUrlStorage: UrlStorage,
    @Inject(LONG_URL_STORAGE_TOKEN)
    private readonly longUrlStorage: UrlStorage,
  ) {
    super();
  }

  encodeLongUrl(longUrl: string): EncodeLongUrlResponse {
    if (!longUrl) return null;
    let shortUrl;

    if (this.shortUrlStorage.hasUrl(longUrl)) {
      shortUrl = this.shortUrlStorage.getUrl(longUrl);
      return this.formatEncodeLongUrlResponse(shortUrl, false);
    }

    shortUrl = this.generateShortUrl(longUrl);
    this.storeUrls(longUrl, shortUrl);
    return this.formatEncodeLongUrlResponse(shortUrl, true);
  }

  decodeShortUrl(shortUrl: string): string | null {
    return this.longUrlStorage.getUrl(shortUrl) || null;
  }

  private storeUrls(longUrl: string, shortUrl: string): void {
    this.shortUrlStorage.storeUrl(longUrl, shortUrl);
    this.longUrlStorage.storeUrl(shortUrl, longUrl);
  }

  private generateShortUrl(longUrl: string): string {
    const numericUrl = this.urlToNumberTransformer.urlToNumber(longUrl);
    return this.numberToShortUrl(numericUrl);
  }

  private numberToShortUrl(idUrl: number): string {
    const charactersAmmount = ALLOWED_ENCODING_CHARACTERS.length;
    let result = '';

    while (idUrl > 0) {
      const chartIndex = idUrl % charactersAmmount;
      result += ALLOWED_ENCODING_CHARACTERS[chartIndex];
      idUrl = Math.floor(idUrl / 2);
    }

    return result;
  }

  private formatEncodeLongUrlResponse(
    shortUrl: string,
    isNewEncoded: boolean,
  ): EncodeLongUrlResponse {
    const response = {
      shortUrl,
      isNewEncoded,
    };
    return response;
  }
}
