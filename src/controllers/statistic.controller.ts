import { Controller, Get, Param } from '@nestjs/common';
import { StatisticsService } from 'src/services/statistics/statistics.service';

@Controller('statistic')
export class StatisticController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get()
  getGeneralStas() {
    return this.statisticsService.getStatistics();
  }

  @Get(':shortUrl')
  statsByShortUrl(@Param('shortUrl') shortUrl: string) {
    return this.statisticsService.getUrlStatistics(shortUrl);
  }
}
