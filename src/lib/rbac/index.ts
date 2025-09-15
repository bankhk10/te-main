export type Permission = {
  action: string;
  resource: string;
};

export type Role = {
  name: string;
  permissions: Permission[];
};

export type SessionUser = {
  id: string;
  email: string;
  roles: Role[];
  permissions: Permission[];
};

export function isRole(user: SessionUser | undefined | null, ...roles: string[]) {
  if (!user) return false;
  return user.roles.some((r) => roles.includes(r.name));
}

export function can(user: SessionUser | undefined | null, action: string, resource: string) {
  if (!user) return false;
  return user.permissions.some(
    (p) => p.action === action && p.resource === resource
  );
}
