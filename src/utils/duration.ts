import type { Duration } from 'date-fns';
import intervalToDuration from "date-fns/intervalToDuration"
import formatDuration from "date-fns/formatDuration";

const granularities: Array<keyof Duration> = ['years', 'months', 'days', 'weeks', 'hours', 'minutes', 'seconds'];

export const formatTimeDuration = (seconds: number) => {
  const duration = intervalToDuration({ start: 0, end: seconds * 1000 });
  const granularity = granularities.find(g => duration[g] as number > 0) || 'minutes';
  return formatDuration(duration, { format: [granularity as string] });
}