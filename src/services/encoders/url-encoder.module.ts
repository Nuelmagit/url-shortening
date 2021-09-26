import { Module } from '@nestjs/common';
import { StorageBasedEncoder } from './storage-based-encoder/storage-based-encoder';
import { StorageBasedEncoderModule } from './storage-based-encoder/storage-based-encoder.module';
import { UrlEncoderService } from './url-encoder.service';

@Module({
  imports: [StorageBasedEncoderModule],
  providers: [
    {
      provide: UrlEncoderService,
      useClass: StorageBasedEncoder,
    },
  ],
})
export class EncoderModule {}
