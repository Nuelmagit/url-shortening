import { Injectable } from '@nestjs/common';
import { DecodeDto } from 'src/dtos/decode.dto';
import { EncodeDto } from 'src/dtos/encode.dto';
import { DecodeResponse } from 'src/response-types/decode-response.dto';
import { EncodeResponse } from 'src/response-types/encode-response.dto';
import { UrlEncoderService } from './encoders/url-encoder.service';

@Injectable()
export class ShortenerRequestHandler {
  constructor(private readonly urlEncoderService: UrlEncoderService) {}

  handleEncode(encodeDto: EncodeDto): EncodeResponse {
    return {
      shortUrl: this.urlEncoderService.encodeLongUrl(encodeDto.longUrl),
    };
  }

  handleDecode(decodeDto: DecodeDto): DecodeResponse {
    return {
      longUrl: this.urlEncoderService.decodeShortUrl(decodeDto.shortUrl),
    };
  }
}
