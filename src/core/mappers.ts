import { MetricSeriesType } from './MetricsDataType';
import { PullRequestMetricsDTO } from './PullRequestMetricsDTO';

export function transformDetailedResponse(
  data: PullRequestMetricsDTO,
  valueIndex: number
): MetricSeriesType[] {
  return data.calculated[0].values.reduce((valuesAcc, { date, values }) => {
    let value = values[valueIndex];
    if (value === null) {
      return valuesAcc;
    }
    if (typeof value === 'string') {
      value = parseInt(value, 10);
    }
    valuesAcc.push({ label: date, value: value as number });
    return valuesAcc;
  }, [] as Array<MetricSeriesType>);
}

export function transformSummaryResponse(
  data: PullRequestMetricsDTO,
  valueIndex: number
): MetricSeriesType[] {
  return data.calculated.map((item) => ({
    label: item.for.repositories[0],
    value: item.values[0].values[valueIndex]
      ? parseInt(item.values[0].values[valueIndex] as string, 10)
      : 0,
  }));
}
