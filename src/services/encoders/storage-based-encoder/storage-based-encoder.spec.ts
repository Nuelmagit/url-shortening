import { Test, TestingModule } from '@nestjs/testing';
import { IMPLEMENTATION_DEFINITIONS } from './implementation-definitions';
import { StorageBasedEncoder } from './storage-based-encoder';

const FIRST_ENCODED_URL = '84210vf731';

describe('StorageBasedstorageBasedEncoder', () => {
  let storageBasedEncoder: StorageBasedEncoder;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StorageBasedEncoder, ...IMPLEMENTATION_DEFINITIONS],
    }).compile();

    storageBasedEncoder = module.get<StorageBasedEncoder>(StorageBasedEncoder);
  });

  it('StorageBasedstorageBasedEncoder - should be defined', () => {
    expect(storageBasedEncoder).toBeDefined();
  });

  it('Should return first encoded url', () => {
    const firstEncodedResult =
      storageBasedEncoder.encodeLongUrl('www.google.com');
    expect(firstEncodedResult.shortUrl).toBe(FIRST_ENCODED_URL);
  });

  it('Should return the same short url for the same long url. Does not  matter how many times it is executed', () => {
    const url = 'www.google.com';
    let counter = 0;
    while (counter < 50) {
      expect(storageBasedEncoder.encodeLongUrl(url).shortUrl).toBe(
        FIRST_ENCODED_URL,
      );
      counter++;
    }
  });

  it('Should decode short url', () => {
    const url = 'www.google.com';
    const encodeResponse = storageBasedEncoder.encodeLongUrl(url);
    expect(storageBasedEncoder.decodeShortUrl(encodeResponse.shortUrl)).toBe(
      url,
    );
  });

  it('Should not return same short url for different long urls', () => {
    const firstUrl = 'www.google.com';
    const secondUrl = 'www.github.com';
    const thirdUrl = 'www.stackoverflow.com';

    const firstshortUrl = storageBasedEncoder.encodeLongUrl(firstUrl);
    const secondShortUrl = storageBasedEncoder.encodeLongUrl(secondUrl);
    const thirdShortUrl = storageBasedEncoder.encodeLongUrl(thirdUrl);

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
});
