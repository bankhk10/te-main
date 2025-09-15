'use client';

import { useSession } from 'next-auth/react';
import type { ReactNode } from 'react';
import { isRole } from '@/lib/rbac';

export function RoleGate({ roles, children }: { roles: string[]; children: ReactNode }) {
  const { data } = useSession();
  if (!isRole(data?.user as any, ...roles)) return null;
  return <>{children}</>;
}
