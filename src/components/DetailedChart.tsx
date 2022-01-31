import { useEffect, useMemo, useRef } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';

import { MetricSeriesType } from '../core/MetricsDataType';
import { formatTimeDuration } from '../utils/duration';
import format from 'date-fns/format';
import { AverageBox } from './AverageBox';
import { css } from '@emotion/react';

export const DetailedChart: React.FunctionComponent<{
  data: Array<MetricSeriesType>;
  isTimeSeries: boolean;
}> = ({ data, isTimeSeries }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const average = useMemo(
    () => data.reduce((sum, item) => sum + item.value, 0) / data.length,
    [data]
  );

  const chartDatasets = useMemo(() => {
    return [
      {
        data: data.map(({ label, value }) => ({ x: label, y: value })),
        borderColor: '#ffa008',
        fill: {
          target: 'origin',
          above: 'rgba(255, 116, 39, 0.2)',
        },
      },
      {
        data: [
          {
            x: data[0].label,
            y: average,
          },
          {
            x: data[data.length - 1].label,
            y: average,
          },
        ],
        borderColor: 'rgba(20, 126, 236, 0.7)',
        borderDash: [10, 10],
        borderWidth: 2,
        pointRadius: 0,
      },
    ];
  }, [average, data]);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const chart = new Chart(canvasRef.current, {
      type: 'line',
      data: {
        datasets: chartDatasets,
      },
      options: {
        plugins: {
          legend: { display: false },
          tooltip: {
            displayColors: false,
            callbacks: {
              title(context) {
                return context.map((item) =>
                  format(
                    (item.parsed as Record<'x' | 'y', Date | number>).x as Date,
                    'MMM dd, yyyy'
                  )
                );
              },
              label(context) {
                return isTimeSeries
                  ? formatTimeDuration(
                      (context.raw as Record<'x' | 'y', string | number>)
                        .y as number
                    ).toString()
                  : context.label;
              },
            },
          },
        },
        scales: {
          x: { type: 'time', time: { unit: 'day' } },
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
        css={{ marginLeft: 'auto' }}
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
