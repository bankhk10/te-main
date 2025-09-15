'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

type FormData = z.infer<typeof schema>;

export function UserForm() {
  const form = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    });
    form.reset();
  }

  return (
    <Form onSubmit={form.handleSubmit(onSubmit)}>
      <input
        className="border p-2 w-full"
        placeholder="Email"
        {...form.register('email')}
      />
      <input
        className="border p-2 w-full"
        placeholder="Password"
        type="password"
        {...form.register('password')}
      />
      <Button type="submit">Create User</Button>
    </Form>
  );
}
