import { Injectable, NotFoundException } from '@nestjs/common';
import { DecodeDto } from 'src/dtos/decode.dto';
import { EncodeDto } from 'src/dtos/encode.dto';
import { DecodeResponse } from 'src/response-types/decode-response.dto';
import { EncodeResponse } from 'src/response-types/encode-response.dto';
import { UrlEncoderService } from './encoders/url-encoder.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { DECODE_EVENT, ENCODE_EVENT } from 'src/events/events';
import { EncodeEventDto } from 'src/events/payloads/encode-event.dto';
@Injectable()
export class ShortenerRequestHandler {
  constructor(
    private readonly urlEncoderService: UrlEncoderService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  handleEncode(encodeDto: EncodeDto): EncodeResponse {
    const encodeReponse = this.urlEncoderService.encodeLongUrl(
      encodeDto.longUrl,
    );

    this.emitEncodeEvent(encodeDto.longUrl, encodeReponse.isNewEncoded);

    return {
      shortUrl: encodeReponse.shortUrl,
    };
  }

  handleDecode(decodeDto: DecodeDto): DecodeResponse {
    const longUrl = this.urlEncoderService.decodeShortUrl(decodeDto.shortUrl);

    this.emitDecodeEvent(longUrl);

    if (!longUrl) throw new NotFoundException(`${decodeDto.shortUrl} does not exist`);

    return { longUrl };
  }

  private emitEncodeEvent(encodedUrl: string, recentlyEncoded: boolean): void {
    const eventPayload: EncodeEventDto = {
      encodedUrl,
      recentlyEncoded,
    };
    this.eventEmitter.emit(ENCODE_EVENT, eventPayload);
  }

  private emitDecodeEvent(decodedUrl: string) {
    this.eventEmitter.emit(DECODE_EVENT, { decodedUrl });
  }
}
