import { Module } from '@nestjs/common';
import { ShortUrlController } from './controllers/short-url.controller';
import { StatisticController } from './controllers/statistic.controller';
import { EncoderModule } from './services/encoders/url-encoder.module';
import { ShortenerRequestHandler } from './services/shortener-request-handler.service';
@Module({
  providers: [ShortenerRequestHandler],
  imports: [EncoderModule],
  controllers: [ShortUrlController, StatisticController],
})
export class AppModule {}
