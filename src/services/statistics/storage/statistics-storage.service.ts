import { Injectable } from '@nestjs/common';

@Injectable()
export class StatisticsStorageService {
  private store: Record<string, any> = {};

  has(key): boolean {
    return !!this.get(key);
  }

  get(key: string) {
    return this.store[key] || null;
  }

  set(key: string, value: any): void {
    this.store[key] = value;
  }

  getStats() {
    return { ...this.store };
  }
}
