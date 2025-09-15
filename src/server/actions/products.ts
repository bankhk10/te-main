'use server';

import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { can } from '@/lib/rbac';

export async function createProduct(data: { name: string }) {
  const session = await auth();
  if (!can(session?.user, 'create', 'products')) throw new Error('Forbidden');
  return prisma.product.create({ data });
}

export async function listProducts() {
  const session = await auth();
  if (!can(session?.user, 'read', 'products')) throw new Error('Forbidden');
  return prisma.product.findMany();
}

export async function updateProduct(id: number, data: { name: string }) {
  const session = await auth();
  if (!can(session?.user, 'update', 'products')) throw new Error('Forbidden');
  return prisma.product.update({ where: { id }, data });
}

export async function deleteProduct(id: number) {
  const session = await auth();
  if (!can(session?.user, 'delete', 'products')) throw new Error('Forbidden');
  return prisma.product.delete({ where: { id } });
}
