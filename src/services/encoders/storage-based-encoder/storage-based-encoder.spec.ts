import { Test, TestingModule } from '@nestjs/testing';
import { IMPLEMENTATION_DEFINITIONS } from './implementation-definitions';
import { StorageBasedEncoder } from './storage-based-encoder';
import { UrlStorage } from './url-storages/implementations/url-storage';
import { LONG_URL_STORAGE_TOKEN } from './url-storages/long-url-storage.token';
import { SHORT_URL_STORAGE_TOKEN } from './url-storages/short-url-storage.token';
import { UrlToNumberTransformer } from './url-to-number-transformers/url-to-number-transformer';

const FIRST_ENCODED_URL = '84210vf731';
const FIRST_URL = 'www.google.com';
const SECOND_URL = 'www.github.com';
const THIRD_URL = 'www.stackoverflow.com';

describe('StorageBasedstorageBasedEncoder', () => {
  let storageBasedEncoder: StorageBasedEncoder;
  let urlToNumberTransformer: UrlToNumberTransformer;

  let shortUrlStorage: UrlStorage;
  let longUrlStorage: UrlStorage;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StorageBasedEncoder, ...IMPLEMENTATION_DEFINITIONS],
    }).compile();

    storageBasedEncoder = module.get<StorageBasedEncoder>(StorageBasedEncoder);
    urlToNumberTransformer = module.get<UrlToNumberTransformer>(
      UrlToNumberTransformer,
    );
    shortUrlStorage = module.get<UrlStorage>(SHORT_URL_STORAGE_TOKEN);
    longUrlStorage = module.get<UrlStorage>(LONG_URL_STORAGE_TOKEN);
  });

  it('StorageBasedstorageBasedEncoder - should be defined', () => {
    expect(storageBasedEncoder).toBeDefined();
  });

  it('Should return first encoded url', () => {
    const firstEncodedResult = storageBasedEncoder.encodeLongUrl(FIRST_URL);
    expect(firstEncodedResult.shortUrl).toBe(FIRST_ENCODED_URL);
  });

  it('Should return the same short url for the same long url. Does not  matter how many times it is executed', () => {
    let counter = 0;
    while (counter < 50) {
      expect(storageBasedEncoder.encodeLongUrl(FIRST_URL).shortUrl).toBe(
        FIRST_ENCODED_URL,
      );
      counter++;
    }
  });

  it('Should decode short url', () => {
    const encodeResponse = storageBasedEncoder.encodeLongUrl(FIRST_URL);
    expect(storageBasedEncoder.decodeShortUrl(encodeResponse.shortUrl)).toBe(
      FIRST_URL,
    );
  });

  it('Should not return same short url for different long urls', () => {
    const firstshortUrl = storageBasedEncoder.encodeLongUrl(FIRST_URL);
    const secondShortUrl = storageBasedEncoder.encodeLongUrl(SECOND_URL);
    const thirdShortUrl = storageBasedEncoder.encodeLongUrl(THIRD_URL);

    expect(firstshortUrl).not.toBe(secondShortUrl);
    expect(firstshortUrl).not.toBe(thirdShortUrl);
    expect(secondShortUrl).not.toBe(thirdShortUrl);
  });

  it('encodeLongUrl should seturn null with falsy values', () => {
    expect(storageBasedEncoder.encodeLongUrl(undefined)).toBeNull();
    expect(storageBasedEncoder.encodeLongUrl(null)).toBeNull();
    expect(
      storageBasedEncoder.encodeLongUrl(NaN as unknown as string),
    ).toBeNull();
    expect(storageBasedEncoder.encodeLongUrl('')).toBeNull();
    expect(
      storageBasedEncoder.encodeLongUrl(false as unknown as string),
    ).toBeNull();
  });

  it('decodeShortUrl should seturn null with falsy values', () => {
    expect(storageBasedEncoder.decodeShortUrl(undefined)).toBeNull();
    expect(storageBasedEncoder.decodeShortUrl(null)).toBeNull();
    expect(
      storageBasedEncoder.decodeShortUrl(NaN as unknown as string),
    ).toBeNull();
    expect(storageBasedEncoder.decodeShortUrl('')).toBeNull();
    expect(
      storageBasedEncoder.decodeShortUrl(false as unknown as string),
    ).toBeNull();
  });

  it('encodeLongUrl should verify is the url was already encoded', () => {
    const spy = jest.spyOn(shortUrlStorage, 'hasUrl');
    storageBasedEncoder.encodeLongUrl(FIRST_URL);

    expect(spy).toHaveBeenCalledWith(FIRST_URL);
  });

  it('encodeLongUrl should return stored url if it was already encoded', () => {
    storageBasedEncoder.encodeLongUrl(FIRST_URL);

    const spy = jest.spyOn(shortUrlStorage, 'getUrl');
    storageBasedEncoder.encodeLongUrl(FIRST_URL);

    expect(spy).toHaveBeenCalledWith(FIRST_URL);
  });

  it('encodeLongUrl should get numeric value of url', () => {
    const spy = jest.spyOn(urlToNumberTransformer, 'urlToNumber');

    storageBasedEncoder.encodeLongUrl(FIRST_URL);

    expect(spy).toHaveBeenCalledWith(FIRST_URL);
  });

  it('encodeLongUrl should store urls after encode', () => {
    const shortUrlStorageSpy = jest.spyOn(shortUrlStorage, 'storeUrl');
    const longUrlStorageSpy = jest.spyOn(longUrlStorage, 'storeUrl');
    const encodeResult = storageBasedEncoder.encodeLongUrl(FIRST_URL);

    expect(shortUrlStorageSpy).toHaveBeenCalledWith(
      FIRST_URL,
      encodeResult.shortUrl,
    );

    expect(longUrlStorageSpy).toHaveBeenCalledWith(
      encodeResult.shortUrl,
      FIRST_URL,
    );
  });
});
