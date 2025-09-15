import { describe, it, expect, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { beforeEach } from 'vitest';

describe('middleware', () => {
  beforeEach(() => vi.resetModules());
  it('allows admin access', async () => {
    vi.doMock('@/lib/auth', () => ({
      auth: async () => ({ user: { roles: [{ name: 'ADMIN' }], permissions: [] } })
    }));
    const { middleware } = await import('../middleware');
    const req = new NextRequest('http://localhost/admin');
    const res = await middleware(req as any);
    expect(res?.status).toBe(200);
  });

  it('blocks non-admin', async () => {
    vi.doMock('@/lib/auth', () => ({
      auth: async () => ({ user: { roles: [{ name: 'USER' }], permissions: [] } })
    }));
    const { middleware } = await import('../middleware');
    const req = new NextRequest('http://localhost/admin');
    const res = await middleware(req as any);
    expect(res.status).toBe(307);
    expect(res.headers.get('location')).not.toBeNull();
  });
});
