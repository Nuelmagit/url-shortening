import { LONG_URL_STORAGE_TOKEN } from './long-url-storage.token';
import { SHORT_URL_STORAGE_TOKEN } from './short-url-storage.token';

describe('UrlStorageTokens', () => {
  it('LONG_URL_STORAGE_TOKEN should be string', () => {
    expect(typeof LONG_URL_STORAGE_TOKEN).toBe('string');
  });

  it('LONG_URL_STORAGE_TOKEN length should be reather or equal to 1', () => {
    expect(LONG_URL_STORAGE_TOKEN.length).toBeGreaterThanOrEqual(1);
  });

  it('SHORT_URL_STORAGE_TOKEN should be string', () => {
    expect(typeof SHORT_URL_STORAGE_TOKEN).toBe('string');
  });

  it('SHORT_URL_STORAGE_TOKEN length should be reather or equal to 1', () => {
    expect(SHORT_URL_STORAGE_TOKEN.length).toBeGreaterThanOrEqual(1);
  });

  it('LONG_URL_STORAGE_TOKEN should be different than SHORT_URL_STORAGE_TOKEN', () => {
    expect(LONG_URL_STORAGE_TOKEN).not.toBe(SHORT_URL_STORAGE_TOKEN);
  });
});
