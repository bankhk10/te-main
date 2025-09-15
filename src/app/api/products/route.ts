import { auth } from '@/lib/auth';
import { can } from '@/lib/rbac';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await auth();
  if (!can(session?.user, 'read', 'products')) {
    return new Response('Forbidden', { status: 403 });
  }
  const products = await prisma.product.findMany();
  return Response.json(products);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!can(session?.user, 'create', 'products')) {
    return new Response('Forbidden', { status: 403 });
  }
  const body = await req.json();
  const product = await prisma.product.create({ data: { name: body.name } });
  return Response.json(product);
}
