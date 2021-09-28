import { Test, TestingModule } from '@nestjs/testing';

import { GeneralDecodeListener } from './general-decode.listener';
import { StatisticsStorageService } from '../statistics/storage/statistics-storage.service';
import { GeneralDecodeStatstic } from '../statistics/statistics-types/general-decode-statistic';
import { GENERAL_DECODE_KEY } from '../statistics/statistics-keys';

const URL = 'www.google.com';

describe('GeneralDecodeListener', () => {
  let generalDecodeListener: GeneralDecodeListener;
  let statisticsStorageService: StatisticsStorageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeneralDecodeListener, StatisticsStorageService],
    }).compile();

    generalDecodeListener = module.get<GeneralDecodeListener>(
      GeneralDecodeListener,
    );

    statisticsStorageService = module.get<StatisticsStorageService>(
      StatisticsStorageService,
    );
  });

  it('GeneralDecodeListener - should be defined', () => {
    expect(generalDecodeListener).toBeDefined();
  });

  it('should init the store', () => {
    expect(statisticsStorageService.get(GENERAL_DECODE_KEY)).not.toBeNull();
  });

  it('should update store when recieving event', () => {
    const spy = jest.spyOn(statisticsStorageService, 'set');

    generalDecodeListener.handleDecodeEvent({
      decodedUrl: URL,
    });

    generalDecodeListener.handleDecodeEvent({
      decodedUrl: null,
    });

    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('should update just existentUrlDecodeRequests when the event has url', () => {
    generalDecodeListener.handleDecodeEvent({
      decodedUrl: URL,
    });

    const stats: GeneralDecodeStatstic =
      statisticsStorageService.get(GENERAL_DECODE_KEY);

    expect(stats.existentUrlDecodeRequests).toBe(1);
    expect(stats.unexistentUrlDecodeRequests).toBe(0);
  });

  it('should update just unexistentUrlDecodeRequests when the event has no url', () => {
    generalDecodeListener.handleDecodeEvent({
      decodedUrl: null,
    });

    const stats: GeneralDecodeStatstic =
      statisticsStorageService.get(GENERAL_DECODE_KEY);

    expect(stats.existentUrlDecodeRequests).toBe(0);
    expect(stats.unexistentUrlDecodeRequests).toBe(1);
  });
});
