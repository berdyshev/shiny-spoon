import format from 'date-fns/format';
import { DateRangeType } from '../types/DateRangeType';
import { IHttpClient } from './IHttpClient';
import { MetricsDataType } from './MetricsDataType';
import { PullRequestMetricsDTO } from './PullRequestMetricsDTO';

export class MetricsApiService {
  constructor(private httpClient: IHttpClient) { }

  async getPullRequestMetrics(
    metrics: Array<string>,
    dateRange: Required<DateRangeType>
  ): Promise<Record<string, MetricsDataType>> {
    const [summaryResponse, detailedResponse] = await Promise.all([
      this.createPRMetricsRequest(metrics, dateRange, 'all'),
      this.createPRMetricsRequest(metrics, dateRange, 'day'),
    ]);

    const data = metrics.reduce((acc, metric, index) => {
      const summary = this.transformSummaryMetric(summaryResponse, index);
      const detailed = this.transformDetailedMetric(detailedResponse, index);

      acc[metric] = { summary, detailed };
      return acc;
    }, {} as Record<string, MetricsDataType>);

    return data;
  }

  private transformDetailedMetric(data: PullRequestMetricsDTO, valueIndex: number) {
    return data.calculated[0].values.reduce(
      (valuesAcc, { date, values }) => {
        let value = values[valueIndex];
        if (value === null) {
          return valuesAcc;
        }
        if (typeof value === 'string') {
          value = parseInt(value, 10);
        }
        valuesAcc.push({ date, value: value as number });
        return valuesAcc;
      },
      [] as Array<{ date: string; value: number; }>
    );
  }

  private transformSummaryMetric(data: PullRequestMetricsDTO, valueIndex: number) {
    return data.calculated.map((item) => ({
      repository: item.for.repositories[0],
      value: item.values[0].values[valueIndex] ? parseInt(item.values[0].values[valueIndex] as string, 10) : 0,
    }));
  }

  private async createPRMetricsRequest(
    metrics: Array<string>,
    dateRange: Required<DateRangeType>,
    granularity: 'day' | 'all'
  ): Promise<PullRequestMetricsDTO> {
    return this.httpClient.post('/v1/metrics/pull_requests', {
      body: {
        for: [
          {
            repositories: [
              'github.com/athenianco/athenian-api',
              'github.com/athenianco/athenian-webapp',
              'github.com/athenianco/infrastructure',
              'github.com/athenianco/metadata',
            ],
            repogroups:
              granularity === 'all' ? [[0], [1], [2], [3]] : undefined,
          },
        ],
        metrics,
        date_from: format(dateRange.startDate, 'yyyy-MM-dd'),
        date_to: format(dateRange.endDate, 'yyyy-MM-dd'),
        granularities: [granularity],
        exclude_inactive: true,
        account: 1,
        timezone: 60,
      },
      credentials: 'omit',
    });
  }
}
