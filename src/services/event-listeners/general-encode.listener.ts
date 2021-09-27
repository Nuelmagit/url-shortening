import { Injectable } from '@nestjs/common';
import { ENCODE_EVENT } from 'src/events/events';
import { OnEvent } from '@nestjs/event-emitter';
import { EncodeEventDto } from 'src/events/payloads/encode-event.dto';
import { GeneralEncodeStatstic } from '../statistics/statistics-types/general-encode-statistic';
import { StatisticStorageUser } from '../statistics/storage/statistic-storage-user';
import { StatisticsStorageService } from '../statistics/storage/statistics-storage.service';

@Injectable()
export class GeneralEncodeListener extends StatisticStorageUser {
  protected readonly storageKey = 'generalEncode';

  constructor(statisticStorage: StatisticsStorageService) {
    super(statisticStorage);
    this.initStore();
  }

  @OnEvent(ENCODE_EVENT)
  handleEncodeEvent(event: EncodeEventDto): void {
    this.updateUrlsEncoded(event.recentlyEncoded);
  }

  private updateUrlsEncoded(isNewEncoded: boolean): void {
    if (!isNewEncoded) return;
    const newState: GeneralEncodeStatstic = this.getPrevStateCopy();
    newState.urlsEncoded++;
    this.updateState(newState);
  }

  protected get initialState(): GeneralEncodeStatstic {
    return new GeneralEncodeStatstic();
  }
}
