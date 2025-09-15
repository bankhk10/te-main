'use client';

import { useSession } from 'next-auth/react';
import { can, isRole } from '@/lib/rbac';

export function useRBAC() {
  const { data } = useSession();
  return {
    can: (action: string, resource: string) => can(data?.user as any, action, resource),
    isRole: (...roles: string[]) => isRole(data?.user as any, ...roles)
  };
}
