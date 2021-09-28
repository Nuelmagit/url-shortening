import { Injectable } from '@nestjs/common';
import {
  DECODE_EVENT,
  ENCODE_EVENT,
  REDIRECTION_EVENT,
} from 'src/events/events';
import { OnEvent } from '@nestjs/event-emitter';
import { EncodeEventDto } from 'src/events/payloads/encode-event.dto';
import { StatisticStorageUser } from '../statistics/storage/statistic-storage-user';
import { StatisticsStorageService } from '../statistics/storage/statistics-storage.service';
import { DecodeEventDto } from 'src/events/payloads/decode-event.dto';
import { RedirectionEventDto } from 'src/events/payloads/redirection-event.dto';
import { UrlStatisticHelper } from './url-statistic.helper';

@Injectable()
export class UrlStatisticListener extends StatisticStorageUser {
  protected readonly storageKey = 'urlStatistics';

  constructor(statisticStorage: StatisticsStorageService) {
    super(statisticStorage);
    this.initStore();
  }

  @OnEvent(ENCODE_EVENT)
  handleEncodeEvent(event: EncodeEventDto): void {
    const helper = new UrlStatisticHelper(this.getPrevStateCopy());
    this.updateEncodeAttemps(event, helper);
  }

  @OnEvent(DECODE_EVENT)
  handleDecodeEvent(event: DecodeEventDto): void {
    const helper = new UrlStatisticHelper(this.getPrevStateCopy());
    this.updateDecodedTimes(event, helper);
  }

  @OnEvent(REDIRECTION_EVENT)
  handleRedirectionEvent(event: RedirectionEventDto): void {
    const helper = new UrlStatisticHelper(this.getPrevStateCopy());
    this.updateRedirections(event, helper);
  }

  private updateRedirections(
    event: RedirectionEventDto,
    helper: UrlStatisticHelper,
  ): void {
    if (!event.longUrl) return;
    const urlState = helper.getUrlState(event.longUrl);
    urlState.redirections++;
    helper.setUrlState(event.longUrl, urlState);
    this.updateState(helper.urlStatisticState);
  }

  private updateDecodedTimes(
    event: DecodeEventDto,
    helper: UrlStatisticHelper,
  ): void {
    if (!event.decodedUrl) return;
    const urlState = helper.getUrlState(event.decodedUrl);
    urlState.decodedTimes++;
    helper.setUrlState(event.decodedUrl, urlState);
    this.updateState(helper.urlStatisticState);
  }

  private updateEncodeAttemps(
    event: EncodeEventDto,
    helper: UrlStatisticHelper,
  ): void {
    if (event.recentlyEncoded) return;
    const urlState = helper.getUrlState(event.encodedUrl);
    urlState.encodeAttemps++;
    helper.setUrlState(event.encodedUrl, urlState);
    this.updateState(helper.urlStatisticState);
  }

  protected get initialState() {
    return {};
  }
}
