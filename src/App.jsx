import React from 'react';
import { css } from '@emotion/react';
import logo from './logo-grey.png';
import timeseriesScreen from './timeseries-screen.png';
import histogramScreen from './histogram-screen.png';
import kpiScreen from './kpi-screen.png';

const App = () => {
  return (
    <div css={appStyle}>
      <header>
        <a
          href="https://athenian.co"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={logo} alt="athenian-logo"/>
        </a>
        <h1>Athenian WebApp Tech Assessment</h1>
      </header>
      <div className="body">
        <div className="daterange">
          <button>Date Range</button>
        </div>
        <div className="insights">
          <h2>Insights</h2>
          <Tabs>
            <Box metricName="X"></Box>
          </Tabs>
          <div className="control">

          </div>
        </div>
      </div>
    </div>
  );
};

const Tabs = ({ children }) => {
  return (
    <div>
      <div css={tabsStyle}><span>Tab 1</span><span>Tab 2</span><span>Tab ...</span><span>Tab n</span><button>Add</button></div>
      {children}
    </div>
  );
};

const Box = ({ metricName }) => {
  return (
    <div css={boxStyle}>
      <button>X</button>      
      <h3>Insights for metric {metricName}</h3>
      <div>
        <img className="chart" src={timeseriesScreen} alt="timeseries-chart"/>
        <img className="chart" src={histogramScreen} alt="histogram-chart"/>
      </div>
      <img className="kpi" src={kpiScreen} alt="kpi"/>
    </div>
  );
};


const appStyle = () => {
  return css`
    width: 100%;
    text-align: center;
    background: whitesmoke;
    padding: 50px 0;

    & button {
      background: #FF6C37;
      cursor: pointer;
    }

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

const tabsStyle = () => {
  return css`
    width: 75%;
    margin: 0px auto;

    & > span, button {
      border: 3px black solid;
      width: 70px;
      height: 24px;
      padding: 0px 10px;
    }
  `;
};

const boxStyle = () => {
  return css`
    width: 75%;
    margin: 0px auto;
    text-align: center;
    border: 3px black solid;

    & img.chart {
      width: 45%;
      height: 200px;
      margin: 5px 5px;
    }

    & img.kpi {
      width: 45%;
      height: 50px;
      margin: 5px 5px;
    }
  `;
};


export default App;
