import type { ButtonHTMLAttributes, ReactNode } from 'react';

export function Button({ children, className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50 ${className}`}
      {...props}
    >
      {children as ReactNode}
    </button>
  );
}
