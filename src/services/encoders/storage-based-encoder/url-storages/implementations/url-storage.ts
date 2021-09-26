export interface UrlStorage {
  getUrl(urlKey: string): string | null;

  storeUrl(urlKey: string, UrlValue: string): void;

  hasUrl(urlKey: string): boolean;
}
