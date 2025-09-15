'use client';

import { useState } from 'react';
import { signIn, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="p-4 space-y-2">
      <input className="border p-2 w-full" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input
        className="border p-2 w-full"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <Button onClick={() => signIn('credentials', { email, password, redirect: true, callbackUrl: '/' })}>
        Login
      </Button>
      <Button onClick={() => signOut({ callbackUrl: '/' })}>Logout</Button>
    </div>
  );
}
