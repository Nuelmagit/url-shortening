import { StatisticsStorageService } from './statistics-storage.service';

export abstract class StatisticStorageUser {
  protected abstract readonly storageKey: string;

  constructor(protected readonly statisticStorage: StatisticsStorageService) {}

  protected abstract get initialState();

  protected initStore(): void {
    this.statisticStorage.set(this.storageKey, this.initialState);
  }

  protected updateState(newState): void {
    this.statisticStorage.set(this.storageKey, newState);
  }

  protected getPrevStateCopy() {
    const prevState = this.statisticStorage.get(this.storageKey);
    return { ...prevState };
  }
}
