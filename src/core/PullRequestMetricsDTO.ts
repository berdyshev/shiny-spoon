export interface PullRequestMetricsDTO {
  calculated: Array<{
    for: {
      repositories: Array<string>;
    };
    granularity: string;
    values: Array<{
      date: string;
      values: Array<unknown>;
    }>;
  }>;
  metrics: Array<string>;
}
