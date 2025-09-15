import { prisma } from '@/lib/prisma';
import { Card } from '@/components/ui/card';
import { Table, TBody, TR, TH, TD, THead } from '@/components/ui/table';

export async function UsersList() {
  const users = await prisma.user.findMany({
    include: { roles: { include: { role: true } } }
  });
  return (
    <Card>
      <Table>
        <THead>
          <TR>
            <TH>Email</TH>
            <TH>Roles</TH>
          </TR>
        </THead>
        <TBody>
          {users.map((u) => (
            <TR key={u.id}>
              <TD>{u.email}</TD>
              <TD>{u.roles.map((r) => r.role.name).join(', ')}</TD>
            </TR>
          ))}
        </TBody>
      </Table>
    </Card>
  );
}
