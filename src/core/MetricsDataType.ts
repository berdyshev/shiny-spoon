
export type MetricSeriesType = {
  label: string;
  value: number;
}
export interface MetricsDataType {
  detailed: Array<MetricSeriesType>;
  summary: Array<MetricSeriesType>;
}
