import type { FormHTMLAttributes, ReactNode } from 'react';

export function Form({ children, className = '', ...props }: FormHTMLAttributes<HTMLFormElement>) {
  return (
    <form className={`space-y-2 ${className}`} {...props}>
      {children as ReactNode}
    </form>
  );
}
