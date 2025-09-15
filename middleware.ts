import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { isRole } from '@/lib/rbac';

export async function middleware(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  if (!session?.user) {
    return NextResponse.redirect(new URL('/api/auth/signin', request.url));
  }

  if (pathname.startsWith('/admin') && !isRole(session.user, 'ADMIN')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/products/:path*']
};
