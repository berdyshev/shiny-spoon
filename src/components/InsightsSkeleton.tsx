import { css } from '@emotion/react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const InsightsSkeleton: React.FunctionComponent = () => {
  return (
    <div css={styles}>
      <div className="col">
        <div className="chart">
          <Skeleton count={1} height={200} />
        </div>
        <div className="box">
          <Skeleton count={1} height={25} />
        </div>
      </div>
      <div className="col">
        <div className="chart">
          <Skeleton count={1} height={200} />
        </div>
        <div className="box">
          <Skeleton count={1} height={25} />
        </div>
      </div>
    </div>
  );
};

const styles = css`
  display: flex;
  width: 100%;
  & > .col {
    width: 50%;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    .chart,
    .box {
      background-color: #fff;
      padding: 2rem;
    }

    .box {
      width: 250px;
    }

    &:first-of-type .box {
      margin-left: auto;
    }
  }
`;
