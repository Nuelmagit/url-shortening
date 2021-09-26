import { Module } from '@nestjs/common';
import { IMPLEMENTATION_DEFINITIONS } from './implementation-definitions';
import { StorageBasedEncoder } from './storage-based-encoder';
import { LONG_URL_STORAGE_TOKEN } from './url-storages/long-url-storage.token';
import { SHORT_URL_STORAGE_TOKEN } from './url-storages/short-url-storage.token';
import { UrlToNumberTransformer } from './url-to-number-transformers/url-to-number-transformer';

@Module({
  imports: [],
  exports: [
    StorageBasedEncoder,
    UrlToNumberTransformer,
    SHORT_URL_STORAGE_TOKEN,
    LONG_URL_STORAGE_TOKEN,
  ],
  providers: [StorageBasedEncoder, ...IMPLEMENTATION_DEFINITIONS],
})
export class StorageBasedEncoderModule {}
