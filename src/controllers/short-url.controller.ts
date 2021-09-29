import { Body, Controller, HttpCode, Post, Req } from '@nestjs/common';
import { DecodeDto } from 'src/dtos/decode.dto';
import { EncodeDto } from 'src/dtos/encode.dto';
import { DecodeResponse } from 'src/response-types/decode-response.dto';
import { EncodeResponse } from 'src/response-types/encode-response.dto';
import { ShortenerRequestHandler } from 'src/services/shortener-request-handler.service';
import { Request } from 'express';
@Controller()
export class ShortUrlController {
  constructor(
    private readonly shortenerRequestHandler: ShortenerRequestHandler,
  ) {}

  @Post('encode')
  @HttpCode(200)
  encode(
    @Body() encodeDto: EncodeDto,
    @Req() request: Request,
  ): EncodeResponse {
    const encodeResponse = this.shortenerRequestHandler.handleEncode(encodeDto);
    this.concatPath(encodeResponse, request);
    return encodeResponse;
  }

  @Post('decode')
  @HttpCode(200)
  decode(@Body() decodeDto: DecodeDto): DecodeResponse {
    return this.shortenerRequestHandler.handleDecode(decodeDto);
  }

  private concatPath(encodeResponse: EncodeResponse, request: Request) {
    encodeResponse.shortUrl = `${request.protocol}://${request.get('host')}/${
      encodeResponse.shortUrl
    }`;
  }
}
