import { InMemoryUrlStorage } from './url-storages/implementations/in-memory-url-storage';
import { LONG_URL_STORAGE_TOKEN } from './url-storages/long-url-storage.token';
import { SHORT_URL_STORAGE_TOKEN } from './url-storages/short-url-storage.token';
import { AutoIncrementalTransformer } from './url-to-number-transformers/auto-incremental-transformer';
import { UrlToNumberTransformer } from './url-to-number-transformers/url-to-number-transformer';

export const IMPLEMENTATION_DEFINITIONS = [
  {
    provide: UrlToNumberTransformer,
    useClass: AutoIncrementalTransformer,
  },
  {
    provide: SHORT_URL_STORAGE_TOKEN,
    useClass: InMemoryUrlStorage,
  },
  {
    provide: LONG_URL_STORAGE_TOKEN,
    useClass: InMemoryUrlStorage,
  },
];
