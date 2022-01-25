import { ButtonHTMLAttributes, forwardRef } from 'react';
import { css } from '@emotion/react';

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, ...props }, ref) => {
  return (
    <button css={btnStyles} {...props} ref={ref}>
      {children}
    </button>
  );
});

const btnStyles = css`
  border-radius: 0.3rem;
  border: none;
  background-color: var(--color-accent);
  color: #fff;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  font-family: inherit;

  &:hover {
    opacity: 0.7;
  }
`;
