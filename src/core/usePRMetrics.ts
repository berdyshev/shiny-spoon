import { useQuery, UseQueryResult } from 'react-query';
import { metricsService } from './bootstrap';
import { DateRangeType } from '../types/DateRangeType';
import { MetricsDataType } from './MetricsDataType';

export const usePRMetrics = (
  metrics: Array<string>,
  dateRange: DateRangeType
): UseQueryResult<Record<string, MetricsDataType>> => {
  return useQuery(
    ['pr-metrics', metrics, dateRange],
    () => metricsService.getPullRequestMetrics(
      metrics,
      dateRange as Required<DateRangeType>
    ),
    {
      enabled:
        metrics.length > 0 && !!dateRange.startDate && !!dateRange.endDate,
    }
  );
};
