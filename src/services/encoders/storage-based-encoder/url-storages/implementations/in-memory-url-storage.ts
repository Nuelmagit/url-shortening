import { UrlStorage } from './url-storage';

export class InMemoryUrlStorage implements UrlStorage {
  protected storedUrls: Record<string, string> = {};

  hasUrl(longUrl: string): boolean {
    return !!this.getUrl(longUrl);
  }

  getUrl(urlKey: string): string | null {
    return this.storedUrls[urlKey] || null;
  }

  storeUrl(urlKey: string, UrlValue: string): void {
    this.storedUrls[urlKey] = UrlValue;
  }
}
