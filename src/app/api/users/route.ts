import { auth } from '@/lib/auth';
import { isRole } from '@/lib/rbac';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function GET() {
  const session = await auth();
  if (!isRole(session?.user, 'ADMIN')) return new Response('Forbidden', { status: 403 });
  const users = await prisma.user.findMany({ include: { roles: { include: { role: true } } } });
  return Response.json(users);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!isRole(session?.user, 'ADMIN')) return new Response('Forbidden', { status: 403 });
  const { email, password } = await req.json();
  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { email, password: hashed } });
  return Response.json(user);
}
