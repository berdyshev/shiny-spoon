import { css } from '@emotion/react';
import logo from './logo.svg';
import { MetricsProvider } from './containers/MetricsProvider';
import { DateFilter } from './containers/DateFilter';
import { MetricsTabs } from './containers/MetricsTabs';
import { AddMetricButton } from './containers/AddMetricButton';

const App = () => {
  return (
    <MetricsProvider>
      <div css={appStyle}>
        <header>
          <a
            href="https://athenian.co"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={logo} alt="athenian-logo" />
          </a>
        </header>
        <div className="body">
          <h1>Athenian WebApp Tech Assessment</h1>
          <div className="actions">
            <DateFilter />
            <AddMetricButton />
          </div>
          <div className="insights">
            <h2>Insights</h2>
            <MetricsTabs />
            <div className="control"></div>
          </div>
        </div>
      </div>
    </MetricsProvider>
  );
};

const appStyle = () => {
  return css`
    width: 100%;
    background: #fafafb;
    min-height: 100vh;

    header {
      width: 100%;
      background: #fff;
      padding: 0.625rem;
      border-bottom: 1px solid #e3e6f0;
    }

    div.body {
      max-width: 1280px;
      margin: 1.25rem auto;
      padding: 0 1.25rem;
    }

    & div.actions {
      margin-top: 1.875rem;
      display: flex;
      justify-content: end;
      gap: 1.25rem;
    }
  `;
};

export default App;
