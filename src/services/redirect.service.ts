import { Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { REDIRECTION_EVENT } from 'src/events/events';
import { RedirectionEventDto } from 'src/events/payloads/redirection-event.dto';
import { UrlEncoderService } from './encoders/url-encoder.service';

@Injectable()
export class RedicrectService {
  constructor(
    private readonly urlEncoderService: UrlEncoderService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  redirect(shortUrl: string): { url: string } {
    const url = this.urlEncoderService.decodeShortUrl(shortUrl);

    if (!url) throw new NotFoundException(`bad url`);

    this.emitEncodeEvent(url);
    return { url };
  }

  private emitEncodeEvent(longUrl: string): void {
    const payload: RedirectionEventDto = {
      longUrl,
    };
    this.eventEmitter.emit(REDIRECTION_EVENT, payload);
  }
}
