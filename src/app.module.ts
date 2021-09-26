import { Module } from '@nestjs/common';
import { ShortUrlController } from './controllers/short-url.controller';
import { StatisticController } from './controllers/statistic.controller';
import { EncoderModule } from './services/encoders/url-encoder.module';
@Module({
  imports: [EncoderModule],
  controllers: [ShortUrlController, StatisticController],
})
export class AppModule {}
