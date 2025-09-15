'use client';

import { useSession } from 'next-auth/react';
import type { ReactNode } from 'react';
import { can } from '@/lib/rbac';

export function PermissionGate({ action, resource, children }: { action: string; resource: string; children: ReactNode }) {
  const { data } = useSession();
  if (!can(data?.user as any, action, resource)) return null;
  return <>{children}</>;
}
