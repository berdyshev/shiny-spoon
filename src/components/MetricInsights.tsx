import { css } from '@emotion/react';

import { MetricsDataType } from '../core/MetricsDataType';
import { DetailedChart } from './DetailedChart';
import { SummaryChart } from './SummaryChart';

export const MetricInsights: React.FunctionComponent<{
  data: MetricsDataType;
  metricName: string;
}> = ({ data, metricName }) => {
  return (
    <div css={containerStyles}>
      <div className="col">
        <DetailedChart
          data={data.detailed}
          isTimeSeries={metricName.endsWith('time')}
        />
      </div>
      <div className="col">
        <SummaryChart
          data={data.summary}
          isTimeSeries={metricName.endsWith('time')}
        />
      </div>
    </div>
  );
};

const containerStyles = css`
  display: flex;
  width: 100%;
  & > .col {
    width: 50%;
    padding: 1.25rem;
  }
`;
