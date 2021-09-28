import { UrlStatstic } from '../statistics/statistics-types/url-statistic';

type urlStatisticState = Record<string, UrlStatstic>;

export class UrlStatisticHelper {
  constructor(public readonly urlStatisticState: urlStatisticState) {}

  getUrlState(url: string): UrlStatstic {
    if (!this.urlHasState(url)) {
      this.initUrlState(url);
    }

    return this.urlStatisticState[url];
  }

  setUrlState(url: string, state: UrlStatstic): void {
    this.urlStatisticState[url] = state;
  }

  private urlHasState(url: string): boolean {
    return !!this.urlStatisticState[url];
  }

  private initUrlState(url: string): void {
    this.urlStatisticState[url] = new UrlStatstic();
  }
}
