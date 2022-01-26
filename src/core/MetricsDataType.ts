export interface MetricsDataType {
  detailed: Array<{ date: string; value: number }>;
  summary: Array<{ repository: string; value: number }>;
}
