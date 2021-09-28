import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { DecodeDto } from 'src/dtos/decode.dto';
import { EncodeDto } from 'src/dtos/encode.dto';
import { DecodeResponse } from 'src/response-types/decode-response.dto';
import { EncodeResponse } from 'src/response-types/encode-response.dto';
import { ShortenerRequestHandler } from 'src/services/shortener-request-handler.service';

@Controller()
export class ShortUrlController {
  constructor(
    private readonly shortenerRequestHandler: ShortenerRequestHandler,
  ) {}

  @Post('encode')
  @HttpCode(200)
  encode(@Body() encodeDto: EncodeDto): EncodeResponse {
    return this.shortenerRequestHandler.handleEncode(encodeDto);
  }

  @Post('decode')
  @HttpCode(200)
  decode(@Body() decodeDto: DecodeDto): DecodeResponse {
    return this.shortenerRequestHandler.handleDecode(decodeDto);
  }
}
