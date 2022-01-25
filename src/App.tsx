import { css } from '@emotion/react';
import logo from './logo-grey.png';
// import timeseriesScreen from './timeseries-screen.png';
// import histogramScreen from './histogram-screen.png';
// import kpiScreen from './kpi-screen.png';
import { MetricsProvider } from './containers/MetricsProvider';
import { DateFilter } from './containers/DateFilter';
import { MetricsTabs } from './containers/MetricsTabs';

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
          <h1>Athenian WebApp Tech Assessment</h1>
        </header>
        <div className="body">
          <div className="daterange">
            <DateFilter />
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
    text-align: center;
    background: whitesmoke;
    padding: 50px 0;

    & div.daterange {
      margin-top: 30px;
    }

    & div.insights {
      margin: 50px auto;
      padding: 30px 0;
      width: 90%;
      border: 3px black solid;
    }
  `;
};

export default App;
