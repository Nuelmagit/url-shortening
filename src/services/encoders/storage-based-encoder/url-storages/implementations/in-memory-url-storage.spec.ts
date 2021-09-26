import { InMemoryUrlStorage } from './in-memory-url-storage';

describe('InMemoryUrlStorage', () => {
  let inMemoryUrlStorage: InMemoryUrlStorage;

  beforeEach(async () => {
    inMemoryUrlStorage = new InMemoryUrlStorage();
  });

  it('InMemoryUrlStorage - should be defined', () => {
    expect(inMemoryUrlStorage).toBeDefined();
  });

  it('Should store the url', () => {
    const key = 'www.google.com';
    const value = '123AbC';
    inMemoryUrlStorage.storeUrl(key, value);
    expect(inMemoryUrlStorage.hasUrl(key)).toBe(true);
  });

  it('Should return the saved url', () => {
    const key = 'www.google.com';
    const value = '123AbC';
    inMemoryUrlStorage.storeUrl(key, value);
    expect(inMemoryUrlStorage.getUrl(key)).toBe(value);
  });

  it('Should return the correct url for all cases', () => {
    const key = 'www.google.com';
    const value = '123AbC';

    for (let i = 0; i <= 150; i++) {
      inMemoryUrlStorage.storeUrl(`${key}${i}`, `${value}${i}`);
    }

    for (let i = 150; i >= 0; i--) {
      expect(inMemoryUrlStorage.getUrl(`${key}${i}`)).toBe(`${value}${i}`);
    }
  });

  it('Should have not the url', () => {
    const key = 'www.google.com';
    expect(inMemoryUrlStorage.hasUrl(key)).toBe(false);
  });

  it('Should return null for no existent url', () => {
    const key = 'www.google.com';
    expect(inMemoryUrlStorage.getUrl(key)).toBeNull();
  });
});
