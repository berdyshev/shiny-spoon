import { css } from '@emotion/react';

export const AverageBox: React.FunctionComponent<{
  label: string;
  value: string;
}> = ({ label, value }) => {
  return (
    <div css={boxStyles}>
      <span className="label">{label}</span>
      <span className="value">{value}</span>
    </div>
  );
};

const boxStyles = css`
  display: inline-flex;
  align-self: flex-end;
  align-items: center;
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
