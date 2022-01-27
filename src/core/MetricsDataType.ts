export type SummaryMetricDataType = Array<{ repository: string; value: number }>;
export type DetailedMetricDataType = Array<{ date: string; value: number }>;

export interface MetricsDataType {
  detailed: DetailedMetricDataType;
  summary: SummaryMetricDataType;
}
