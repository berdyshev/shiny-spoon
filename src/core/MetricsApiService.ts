import format from 'date-fns/format';
import { DateRangeType } from '../types/DateRangeType';
import { IHttpClient } from './IHttpClient';
import { PullRequestMetricsDTO } from './PullRequestMetricsDTO';

export class MetricsApiService {
  constructor(private httpClient: IHttpClient) { }

  public async getPRMetricsData(
    metrics: Array<string>,
    dateRange: Required<DateRangeType>,
    granularity: 'day' | 'all'
  ): Promise<PullRequestMetricsDTO> {
    return await this.httpClient.post('/v1/metrics/pull_requests', {
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
