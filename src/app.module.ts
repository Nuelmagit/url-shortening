import { Module } from '@nestjs/common';
import { ShortUrlController } from './controllers/short-url.controller';
import { StatisticController } from './controllers/statistic.controller';
import { EncoderModule } from './services/encoders/url-encoder.module';
import { ShortenerRequestHandler } from './services/shortener-request-handler.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { listeners } from './services/event-listeners/listeners';
import { StatisticsStorageService } from './services/statistics/storage/statistics-storage.service';

@Module({
  providers: [ShortenerRequestHandler, StatisticsStorageService, ...listeners],
  imports: [EncoderModule, EventEmitterModule.forRoot()],
  controllers: [ShortUrlController, StatisticController],
})
export class AppModule {}
