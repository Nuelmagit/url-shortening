import { Body, Controller, Post } from '@nestjs/common';
import { DecodeDto } from 'src/dtos/decode.dto';
import { EncodeDto } from 'src/dtos/encode.dto';

@Controller()
export class ShortUrlController {
  constructor() {}

  @Post('encode')
  encode(@Body() encodeDto: EncodeDto): string {
    return 'encode';
  }

  @Post('decode')
  decode(@Body() decodeDto: DecodeDto) {
    return 'decode';
  }
}
