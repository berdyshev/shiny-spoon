import { css } from '@emotion/react';
import Chart from 'chart.js/auto';
import { useEffect, useMemo, useRef } from 'react';
import { SummaryMetricDataType } from '../core/MetricsDataType';
import { formatTimeDuration } from '../utils/duration';
import { AverageBox } from './AverageBox';

const parseRepoName = (repoAddress: string) => repoAddress.split('/').pop();

export const SummaryChart: React.FunctionComponent<{
  data: SummaryMetricDataType;
  isTimeSeries: boolean;
}> = ({ data, isTimeSeries }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const average = useMemo(
    () => data.reduce((sum, item) => sum + item.value, 0) / data.length,
    [data]
  );

  const chartDatasets = useMemo(() => {
    return {
      labels: data.map((item) => parseRepoName(item.repository)),
      dataset: data.map((item) => item.value),
    };
  }, [data]);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const { labels, dataset } = chartDatasets;
    const chart = new Chart(canvasRef.current, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            data: dataset,
            backgroundColor: dataset.map(() => 'rgba(20, 126, 236, 0.7)'),
          },
        ],
      },
      options: {
        plugins: {
          legend: { display: false },
          tooltip: {
            displayColors: false,
            callbacks: {
              label(context) {
                console.log(context);
                return isTimeSeries
                  ? formatTimeDuration(context.raw as number).toString()
                  : context.label;
              },
            },
          },
        },
        scales: {
          y: {
            ticks: {
              maxTicksLimit: 5,
              callback: (value) =>
                isTimeSeries ? formatTimeDuration(value as number) : value,
            },
          },
        },
      },
    });

    return () => chart.destroy();
  }, [chartDatasets, isTimeSeries]);

  return (
    <div css={chartStyles}>
      <div className="chart-container">
        <canvas ref={canvasRef} />
      </div>
      <AverageBox
        label="Average"
        value={
          isTimeSeries
            ? formatTimeDuration(average)
            : average.toLocaleString(undefined, { maximumFractionDigits: 1 })
        }
      />
    </div>
  );
};

const chartStyles = css`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  .chart-container {
    background-color: #fff;
    padding: 1rem;
  }
`;
