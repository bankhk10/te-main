import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const permissions = [
    { action: 'create', resource: 'products' },
    { action: 'read', resource: 'products' },
    { action: 'update', resource: 'products' },
    { action: 'delete', resource: 'products' },
  ];

  const createdPermissions = await Promise.all(
    permissions.map((p) =>
      prisma.permission.upsert({
        where: { action_resource: { action: p.action, resource: p.resource } },
        update: {},
        create: p,
      })
    )
  );

  const roleNames = ['ADMIN', 'MANAGER', 'USER'];
  for (const name of roleNames) {
    await prisma.role.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  const admin = await prisma.role.findUnique({ where: { name: 'ADMIN' } });
  const manager = await prisma.role.findUnique({ where: { name: 'MANAGER' } });
  const userRole = await prisma.role.findUnique({ where: { name: 'USER' } });

  if (admin) {
    for (const perm of createdPermissions) {
      await prisma.rolePermission.upsert({
        where: { roleId_permissionId: { roleId: admin.id, permissionId: perm.id } },
        update: {},
        create: { roleId: admin.id, permissionId: perm.id },
      });
    }
  }

  const readPerm = createdPermissions.find((p) => p.action === 'read');
  if (readPerm && manager) {
    await prisma.rolePermission.upsert({
      where: { roleId_permissionId: { roleId: manager.id, permissionId: readPerm.id } },
      update: {},
      create: { roleId: manager.id, permissionId: readPerm.id },
    });
  }
  if (readPerm && userRole) {
    await prisma.rolePermission.upsert({
      where: { roleId_permissionId: { roleId: userRole.id, permissionId: readPerm.id } },
      update: {},
      create: { roleId: userRole.id, permissionId: readPerm.id },
    });
  }

  const password = await bcrypt.hash('password', 10);
  if (admin) {
    await prisma.user.upsert({
      where: { email: 'admin@example.com' },
      update: {},
      create: {
        email: 'admin@example.com',
        password,
        roles: { create: { roleId: admin.id } },
      },
    });
  }

  await prisma.product.upsert({
    where: { id: 1 },
    update: { name: 'Sample Product' },
    create: { id: 1, name: 'Sample Product' }
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
