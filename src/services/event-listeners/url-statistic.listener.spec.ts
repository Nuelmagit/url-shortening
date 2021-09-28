import { Test, TestingModule } from '@nestjs/testing';
import { StatisticsStorageService } from '../statistics/storage/statistics-storage.service';
import { UrlStatisticListener } from './url-statistic.listener';

const URL = 'www.google.com';

const storeKey = 'urlStatistics';

/**
 * TODO: exaustive tests
 */
describe('UrlStatisticListener', () => {
  let urlStatisticListener: UrlStatisticListener;
  let statisticsStorageService: StatisticsStorageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UrlStatisticListener, StatisticsStorageService],
    }).compile();

    urlStatisticListener =
      module.get<UrlStatisticListener>(UrlStatisticListener);

    statisticsStorageService = module.get<StatisticsStorageService>(
      StatisticsStorageService,
    );
  });

  it('UrlStatisticListener - should be defined', () => {
    expect(urlStatisticListener).toBeDefined();
  });

  it('should init the store', () => {
    expect(statisticsStorageService.get(storeKey)).not.toBeNull();
  });

  it('should not create url state the first time the url is encoded', () => {
    urlStatisticListener.handleEncodeEvent({
      encodedUrl: URL,
      recentlyEncoded: true,
    });

    const store = statisticsStorageService.get(storeKey);

    expect(store[URL]).toBeUndefined();
  });

  it('should not update encodeAttemps the first time the url is encoded.', () => {
    //it creates url's state
    urlStatisticListener.handleRedirectionEvent({ longUrl: URL });

    urlStatisticListener.handleEncodeEvent({
      encodedUrl: URL,
      recentlyEncoded: true,
    });

    const store = statisticsStorageService.get(storeKey);

    expect(store[URL].encodeAttemps).toBe(0);
  });

  it('should update encodeAttemps if its not the first time the url is encoded', () => {
    urlStatisticListener.handleEncodeEvent({
      encodedUrl: URL,
      recentlyEncoded: true,
    });

    let counter = 0;
    while (counter < 100) {
      urlStatisticListener.handleEncodeEvent({
        encodedUrl: URL,
        recentlyEncoded: false,
      });
      counter++;
    }

    const store = statisticsStorageService.get(storeKey);
    expect(store[URL].encodeAttemps).toBe(counter);
  });
});
