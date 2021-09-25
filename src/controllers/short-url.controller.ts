import { Controller, Get, Param, Post } from '@nestjs/common';

@Controller()
export class ShortUrlController {
  constructor() {}

  @Post('encode')
  encode(): string {
    return 'encode';
  }

  @Post('decode')
  decode() {
    return 'decode';
  }
}
