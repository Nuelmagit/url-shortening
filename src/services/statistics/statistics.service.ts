import { Injectable, NotFoundException } from '@nestjs/common';
import { UrlEncoderService } from '../encoders/url-encoder.service';
import { StatisticsStorageService } from '../statistics/storage/statistics-storage.service';
import { URL_STATISTICS_KEY } from './statistics-keys';
import { UrlStatstic } from './statistics-types/url-statistic';

@Injectable()
export class StatisticsService {
  constructor(
    private readonly statisticStorage: StatisticsStorageService,
    private readonly urlEncoderService: UrlEncoderService,
  ) {}

  getStatistics() {
    return this.statisticStorage.getStats();
  }

  getUrlStatistics(shortUrl: string): Record<string, UrlStatstic | null> {
    const longUrl = this.getLongUrl(shortUrl);
    const urlStorage = this.statisticStorage.get(URL_STATISTICS_KEY);
    return { [longUrl]: urlStorage[longUrl] || null };
  }

  private getLongUrl(shortUrl: string) {
    const longUrl = this.urlEncoderService.decodeShortUrl(shortUrl);

    if (!longUrl) throw new NotFoundException(`${shortUrl} does not exist`);

    return longUrl;
  }
}
