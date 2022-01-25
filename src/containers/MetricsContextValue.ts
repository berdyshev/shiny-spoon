import { DateRangeType } from "../types/DateRangeType";

export interface MetricsContextValue {
  dateRange: DateRangeType;
  metrics: Array<string>;
  setDateRange: (dateRange: DateRangeType) => void;
  addNewMetric: (metric: string) => void;
  removeMetric: (metric: string) => void;
}