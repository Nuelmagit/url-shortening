import { Module } from '@nestjs/common';
import { ShortUrlController } from './controllers/short-url.controller';
import { StatisticController } from './controllers/statistic.controller';

@Module({
  imports: [],
  controllers: [ShortUrlController, StatisticController],
  providers: [],
})
export class AppModule {}
