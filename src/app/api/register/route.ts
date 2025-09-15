import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const hashed = await bcrypt.hash(password, 10);
  const role = await prisma.role.findUnique({ where: { name: 'USER' } });
  const user = await prisma.user.create({
    data: {
      email,
      password: hashed,
      roles: role ? { create: { roleId: role.id } } : undefined
    }
  });
  return Response.json(user);
}
