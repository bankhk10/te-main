import { auth } from '@/lib/auth';
import { can } from '@/lib/rbac';
import { prisma } from '@/lib/prisma';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!can(session?.user, 'update', 'products')) {
    return new Response('Forbidden', { status: 403 });
  }
  const body = await req.json();
  const product = await prisma.product.update({
    where: { id: Number(params.id) },
    data: { name: body.name }
  });
  return Response.json(product);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!can(session?.user, 'delete', 'products')) {
    return new Response('Forbidden', { status: 403 });
  }
  await prisma.product.delete({ where: { id: Number(params.id) } });
  return new Response(null, { status: 204 });
}
