import { Tabs, TabPanel, Tab, TabList } from 'react-tabs';
import { css } from '@emotion/react';

import { useMetricsContext } from './MetricsProvider';
import { getMetricLabel, MetricsEnum } from '../types/MetricsEnum';
import { usePRMetrics } from '../core/usePRMetrics';

const tabsStyles = css`
  .react-tabs__tab-list {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    gap: 1.25rem;
    justify-content: center;
  }

  .react-tabs__tab {
    display: inline-flex;
    flex-wrap: nowrap;
    gap: 0.625rem;
    min-width: 50px;
    padding: 0.625rem;
    align-items: center;
    justify-content: space-between;
    border-bottom: 0.3rem solid transparent;
    cursor: pointer;

    &--selected {
      border-bottom-color: var(--color-accent);
    }

    & > button {
      border: 0;
      background: none;
      padding: 3px;
      cursor: pointer;
      color: var(--color-disabled);

      &:hover {
        border-radius: 100rem;
        background-color: var(--color-background);
      }
    }
  }

  .react-tabs__tab-panel--selected {
    border-top: 1px solid var(--color-border);
    padding: 1.25rem;
  }
`;

export const MetricsTabs = () => {
  const { metrics, dateRange, removeMetric } = useMetricsContext();
  const { data, isLoading } = usePRMetrics(metrics, dateRange);

  return (
    <Tabs css={tabsStyles}>
      <TabList>
        {metrics.map((name) => (
          <Tab key={name}>
            <span>{getMetricLabel(name as MetricsEnum) || name} </span>
            <button
              title="Remove metric"
              type="button"
              onClick={() => removeMetric(name)}
            >
              ✕
            </button>
          </Tab>
        ))}
      </TabList>
      {metrics.map((name) => (
        <TabPanel key={name}>
          {isLoading ? 'Loading ...' : JSON.stringify(data)}
        </TabPanel>
      ))}
    </Tabs>
  );
};
