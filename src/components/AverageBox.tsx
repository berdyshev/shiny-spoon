import { css } from '@emotion/react';

export const AverageBox: React.FunctionComponent<{
  label: string;
  value: string;
}> = ({ label, value, ...props }) => {
  return (
    <div css={boxStyles} {...props}>
      <span className="label">{label}</span>
      <span className="value">{value}</span>
    </div>
  );
};

const boxStyles = css`
  width: 250px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding: 2rem;
  background-color: #fff;

  .label {
    text-transform: uppercase;
    color: var(--color-disabled);
  }

  .value {
    font-weight: bold;
    font-size: 1.25rem;
  }
`;
