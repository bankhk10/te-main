import { describe, it, expect } from 'vitest';
import { can, isRole, SessionUser } from '../src/lib/rbac';

const user: SessionUser = {
  id: '1',
  email: 'a@a.com',
  roles: [{ name: 'ADMIN', permissions: [{ action: 'create', resource: 'products' }] }],
  permissions: [{ action: 'create', resource: 'products' }]
};

describe('RBAC helpers', () => {
  it('isRole returns true for existing role', () => {
    expect(isRole(user, 'ADMIN')).toBe(true);
  });
  it('can returns true for permission', () => {
    expect(can(user, 'create', 'products')).toBe(true);
  });
});
