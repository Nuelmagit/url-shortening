import { Test, TestingModule } from '@nestjs/testing';
import { StatisticsStorageService } from './statistics-storage.service';

const KEY = 'key1';
const VALUE = { encoded: 1 };

describe('ShortenerRequestHandler', () => {
  let statisticsStorageService: StatisticsStorageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatisticsStorageService],
    }).compile();

    statisticsStorageService = module.get<StatisticsStorageService>(
      StatisticsStorageService,
    );
  });

  it('StatisticsStorageService - should be defined', () => {
    expect(statisticsStorageService).toBeDefined();
  });

  it('should return null when key does not exist', () => {
    expect(statisticsStorageService.get('fakeKey')).toBeNull();
  });

  it('should store value and retrieve it', () => {
    statisticsStorageService.set(KEY, VALUE);
    expect(statisticsStorageService.get(KEY)).toBe(VALUE);
  });

  it('should return true if the value was stored', () => {
    statisticsStorageService.set(KEY, VALUE);
    expect(statisticsStorageService.has(KEY)).toBe(true);
  });

  it('should return false if the value was not stored', () => {
    expect(statisticsStorageService.has(KEY)).toBe(false);
  });

  it('should return all stored values', () => {
    const expectedStore = {};

    let count = 0;

    while (count < 50) {
      const key = `${KEY}${count}`;
      const value = { encoded: count };
      expectedStore[key] = value;
      statisticsStorageService.set(key, value);
      count++;
    }

    expect(statisticsStorageService.getStats()).toStrictEqual(expectedStore);
  });
});
