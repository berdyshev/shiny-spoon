import { Tabs, TabPanel, Tab, TabList } from 'react-tabs';
import { css } from '@emotion/react';

import { useMetricsContext } from './MetricsProvider';

const tabsStyles = css`
  .react-tabs__tab-list {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    gap: 20px;
    justify-content: center;
  }

  .react-tabs__tab {
    display: inline-flex;
    flex-wrap: nowrap;
    gap: 10px;
    min-width: 50px;
    padding: 10px;
    align-items: center;
    justify-content: space-between;
    border-bottom: 0.3rem solid transparent;
    cursor: pointer;

    &--selected {
      border-bottom-color: rgb(255, 160, 8);
    }

    & > button {
      border: none;
      background: none;
      padding: 1px;
      cursor: pointer;
    }
  }

  .react-tabs__tab-panel--selected {
    border-top: 1px solid #e3e6f0;
    padding: 20px;
  }
`;

export const MetricsTabs = () => {
  const { metrics, removeMetric } = useMetricsContext();

  return (
    <Tabs css={tabsStyles}>
      <TabList>
        {metrics.map((name) => (
          <Tab key={name}>
            {name}{' '}
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
        <TabPanel key={name}>{name}</TabPanel>
      ))}
    </Tabs>
  );
};
