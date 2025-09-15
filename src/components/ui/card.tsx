import type { ReactNode } from 'react';

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`rounded border p-4 bg-white shadow ${className}`}>{children}</div>;
}
