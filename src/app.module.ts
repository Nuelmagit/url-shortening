import { Module } from '@nestjs/common';
import { ShortUrlController } from './controllers/short-url.controller';
import { StatisticController } from './controllers/statistic.controller';
import { EncoderModule } from './services/encoders/url-encoder.module';
import { ShortenerRequestHandler } from './services/shortener-request-handler.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { listeners } from './services/event-listeners/listeners';
import { StatisticsStorageService } from './services/statistics/storage/statistics-storage.service';
import { StatisticsService } from './services/statistics/statistics.service';
import { RedicrectService } from './services/redirect.service';
import { RedirectController } from './controllers/redirect.controller';

@Module({
  providers: [
    ShortenerRequestHandler,
    StatisticsStorageService,
    StatisticsService,
    RedicrectService,
    ...listeners,
  ],
  imports: [EncoderModule, EventEmitterModule.forRoot()],
  controllers: [ShortUrlController, StatisticController, RedirectController],
})
export class AppModule {}
