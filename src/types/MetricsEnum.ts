export type MetricsEnum =
  | 'pr-wip-time'
  | 'pr-wip-count'
  | 'pr-review-time'
  | 'pr-review-count'
  | 'pr-merging-time'
  | 'pr-merging-count'
  | 'pr-release-time'
  | 'pr-release-count'
  | 'pr-lead-time'
  | 'pr-lead-count'
  | 'pr-cycle-time'
  | 'pr-cycle-count'
  | 'pr-opened'
  | 'pr-reviewed'
  | 'pr-not-reviewed'
  | 'pr-merged'
  | 'pr-rejected'
  | 'pr-closed'
  | 'pr-done';

export const metricsOptions: Array<{ value: MetricsEnum; label: string }> = [
  { value: 'pr-wip-time', label: 'WIP Time' },
  { value: 'pr-wip-count', label: 'WIP Count' },
  { value: 'pr-review-time', label: 'Review Time' },
  { value: 'pr-review-count', label: 'Review Count' },
  { value: 'pr-merging-time', label: 'Merging Time' },
  { value: 'pr-merging-count', label: 'Merging Count' },
  { value: 'pr-release-time', label: 'Release Time' },
  { value: 'pr-release-count', label: 'Release Count' },
  { value: 'pr-lead-time', label: 'Lead Time' },
  { value: 'pr-lead-count', label: 'Lead Count' },
  { value: 'pr-cycle-time', label: 'Cycle Time' },
  { value: 'pr-cycle-count', label: 'Cycle Count' },
  { value: 'pr-opened', label: 'Opened' },
  { value: 'pr-reviewed', label: 'Reviewed' },
  { value: 'pr-not-reviewed', label: 'Not Reviewed' },
  { value: 'pr-merged', label: 'Merged' },
  { value: 'pr-rejected', label: 'Rejected' },
  { value: 'pr-closed', label: 'Closed' },
  { value: 'pr-done', label: 'Done' },
];

export const getMetricLabel = (metric: MetricsEnum) =>
  metricsOptions.find((m) => m.value === metric)?.label;
