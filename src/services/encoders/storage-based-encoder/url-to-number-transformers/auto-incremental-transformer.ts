import { INITIAL_URL_NUMERIC_VALUE } from '../../constants/initial-url-numeric-value';
import { UrlToNumberTransformer } from './url-to-number-transformer';

export class AutoIncrementalTransformer implements UrlToNumberTransformer {
  private nextUrlNumericValue = INITIAL_URL_NUMERIC_VALUE;
  private urlToNumberMap: Record<string, number> = {};

  urlToNumber(longUrl: string): number {
    if (!this.hasNumericValue(longUrl)) this.generateNumericValue(longUrl);
    return this.getNumericValue(longUrl);
  }

  private hasNumericValue(longUrl: string): boolean {
    return !!this.getNumericValue(longUrl);
  }

  private getNumericValue(longUrl: string): number {
    return this.urlToNumberMap[longUrl];
  }

  private generateNumericValue(longUrl: string): void {
    this.urlToNumberMap[longUrl] = this.nextUrlNumericValue;
    this.nextUrlNumericValue++;
  }
}
