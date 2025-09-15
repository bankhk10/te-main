'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submit() {
    await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    });
    await signIn('credentials', { email, password, redirect: true, callbackUrl: '/' });
  }

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
      <Button onClick={submit}>Register</Button>
    </div>
  );
}
