import { css } from '@emotion/react';
import { metricsOptions } from '../types/MetricsEnum';

interface IMetricsMenuProps {
  metrics: Array<string>;
  onClick: (name: string) => void;
}

export const MetricsMenu: React.FunctionComponent<IMetricsMenuProps> = ({
  metrics,
  onClick,
}) => {
  return (
    <div css={menuContainerStyles}>
      <div css={menuStyles}>
        <ul>
          {metricsOptions.map(({ value, label }) => (
            <li key={value}>
              <button
                disabled={metrics.includes(value)}
                onClick={() => onClick(value)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const menuContainerStyles = css`
  min-width: 160px;
  margin-top: 2px;
  padding: 0.625rem;
  background: #fff;
  border: 1px solid var(--color-border);
  border-radius: 0.3rem;
`;

const menuStyles = css`
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 0.5rem;

  & > ul {
    list-style: none;
    margin: 0;
    padding: 0;

    & > li {
      & > button {
        width: 100%;
        border: 0;
        background: transparent;
        padding: 0;
        cursor: pointer;
        padding: 0.5rem 0.625rem;
        text-align: left;

        &:hover:not(:disabled) {
          background-color: var(--color-background);
          border-radius: 0.3rem;
        }

        &:disabled {
          color: var(--color-disabled);
          cursor: initial;
        }
      }
    }
  }
`;
