import { Test, TestingModule } from '@nestjs/testing';

import { GeneralEncodeListener } from './general-encode.listener';
import { StatisticsStorageService } from '../statistics/storage/statistics-storage.service';

const URL = 'www.google.com';

const storeKey = 'generalEncode';

describe('GeneralEncodeListener', () => {
  let generalEncodeListener: GeneralEncodeListener;
  let statisticsStorageService: StatisticsStorageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeneralEncodeListener, StatisticsStorageService],
    }).compile();

    generalEncodeListener = module.get<GeneralEncodeListener>(
      GeneralEncodeListener,
    );

    statisticsStorageService = module.get<StatisticsStorageService>(
      StatisticsStorageService,
    );
  });

  it('GeneralEncodeListener - should be defined', () => {
    expect(generalEncodeListener).toBeDefined();
  });

  it('should init the store', () => {
    expect(statisticsStorageService.get(storeKey)).not.toBeNull();
  });

  it('should update store when the url was recently encoded', () => {
    const spy = jest.spyOn(statisticsStorageService, 'set');

    generalEncodeListener.handleEncodeEvent({
      encodedUrl: URL,
      recentlyEncoded: true,
    });

    expect(spy).toHaveBeenCalled();
  });

  it('should do nothing when the url was already encoded', () => {
    const spy = jest.spyOn(statisticsStorageService, 'set');

    generalEncodeListener.handleEncodeEvent({
      encodedUrl: URL,
      recentlyEncoded: false,
    });

    expect(spy).not.toHaveBeenCalled();
  });

  it('should increase urlsEncoded by 1 per each new url encoded', () => {
    let counter = 0;

    while (counter < 100) {
      generalEncodeListener.handleEncodeEvent({
        encodedUrl: `${URL}${counter}`,
        recentlyEncoded: true,
      });
      counter++;
      const store = statisticsStorageService.get(storeKey);
      expect(store.urlsEncoded).toBe(counter);
    }
  });
});
