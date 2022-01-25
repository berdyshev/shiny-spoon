export const METRICS_STORAGE_KEY = '@metrics';

export class MetricsStorage {
  static getStoredItems(): Array<string> {
    const rawData = localStorage.getItem(METRICS_STORAGE_KEY);
    return rawData ? rawData.split(',') : [];
  }

  static saveItems(items: Array<string>): void {
    localStorage.setItem(METRICS_STORAGE_KEY, items.join(','));
  }
}
