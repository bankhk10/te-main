import type { ReactNode } from 'react';

export function Table({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <table className={`min-w-full border ${className}`}>{children}</table>;
}

export function THead({ children }: { children: ReactNode }) {
  return <thead className="bg-gray-50">{children}</thead>;
}

export function TBody({ children }: { children: ReactNode }) {
  return <tbody>{children}</tbody>;
}

export function TR({ children }: { children: ReactNode }) {
  return <tr className="border-b last:border-0">{children}</tr>;
}

export function TH({ children }: { children: ReactNode }) {
  return <th className="p-2 text-left font-medium">{children}</th>;
}

export function TD({ children }: { children: ReactNode }) {
  return <td className="p-2">{children}</td>;
}
