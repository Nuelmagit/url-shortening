import { Injectable } from '@nestjs/common';
import { DECODE_EVENT } from 'src/events/events';
import { OnEvent } from '@nestjs/event-emitter';
import { StatisticStorageUser } from '../statistics/storage/statistic-storage-user';
import { StatisticsStorageService } from '../statistics/storage/statistics-storage.service';
import { GeneralDecodeStatstic } from '../statistics/statistics-types/general-decode-statistic';
import { DecodeEventDto } from 'src/events/payloads/decode-event.dto';
import { GENERAL_DECODE_KEY } from '../statistics/statistics-keys';

@Injectable()
export class GeneralDecodeListener extends StatisticStorageUser {
  protected readonly storageKey = GENERAL_DECODE_KEY;

  constructor(statisticStorage: StatisticsStorageService) {
    super(statisticStorage);
    this.initStore();
  }

  @OnEvent(DECODE_EVENT)
  handleDecodeEvent(event: DecodeEventDto): void {
    const newState = this.getPrevStateCopy();
    this.updateExistentUrlDecode(newState, event.decodedUrl);
    this.updateUnExistentUrlDecode(newState, event.decodedUrl);
    this.updateState(newState);
  }

  private updateExistentUrlDecode(state: GeneralDecodeStatstic, url: string) {
    if (!url) return;
    state.existentUrlDecodeRequests++;
  }

  private updateUnExistentUrlDecode(state: GeneralDecodeStatstic, url: string) {
    if (url) return;
    state.unexistentUrlDecodeRequests++;
  }

  protected get initialState(): GeneralDecodeStatstic {
    return new GeneralDecodeStatstic();
  }
}
