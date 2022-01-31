import { useQuery, UseQueryResult } from 'react-query';
import { metricsService } from './bootstrap';
import { DateRangeType } from '../types/DateRangeType';
import { MetricsDataType } from './MetricsDataType';
import { transformDetailedResponse, transformSummaryResponse } from './mappers';


export const usePRMetrics = (
  metrics: Array<string>,
  dateRange: DateRangeType
): UseQueryResult<Record<string, MetricsDataType>> => {
  return useQuery(
    ['pr-metrics', metrics, dateRange],
    async () => {
      const [summaryResponse, detailedResponse] = await Promise.all([
        metricsService.getPRMetricsData(metrics, dateRange as Required<DateRangeType>, 'all'),
        metricsService.getPRMetricsData(metrics, dateRange as Required<DateRangeType>, 'day'),
      ]);

      return metrics.reduce((acc, metric, index) => {
        const summary = transformSummaryResponse(summaryResponse, index);
        const detailed = transformDetailedResponse(detailedResponse, index);

        acc[metric] = { summary, detailed };
        return acc;
      }, {} as Record<string, MetricsDataType>);
    },
    {
      enabled:
        metrics.length > 0 && !!dateRange.startDate && !!dateRange.endDate,
    }
  );
};
