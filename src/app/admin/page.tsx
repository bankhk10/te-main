import { RoleGate } from '@/components/rbac/RoleGate';
import { UserForm } from './user-form';
import { UsersList } from './users-list';

export default function AdminPage() {
  return (
    <RoleGate roles={['ADMIN']}>
      <main className="p-4 space-y-4">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <UserForm />
        <UsersList />
      </main>
    </RoleGate>
  );
}
