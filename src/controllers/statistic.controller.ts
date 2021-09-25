import { Controller, Get, Param } from '@nestjs/common';

@Controller('statistic')
export class StatisticController {
  constructor() {}

  @Get(':shortUrl')
  statsByShortUrl(@Param('shortUrl') shortUrl: string) {
    return `statistic ${shortUrl}`;
  }
}
