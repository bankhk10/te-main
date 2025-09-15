import Credentials from 'next-auth/providers/credentials';
import type { NextAuthConfig } from 'next-auth';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export const authConfig: NextAuthConfig = {
  session: { strategy: 'jwt' },
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: {
            roles: {
              include: {
                role: { include: { permissions: { include: { permission: true } } } }
              }
            }
          }
        });
        if (!user) return null;
        const valid = await bcrypt.compare(credentials.password, user.password);
        if (!valid) return null;
        const roles = user.roles.map((r) => ({
          name: r.role.name,
          permissions: r.role.permissions.map((rp) => ({
            action: rp.permission.action,
            resource: rp.permission.resource
          }))
        }));
        const permissions = roles.flatMap((r) => r.permissions);
        return {
          id: user.id,
          email: user.email,
          roles: roles.map((r) => ({ name: r.name })),
          permissions
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as any;
      return session;
    }
  }
};
