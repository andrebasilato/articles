import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  const [admin, editor, reader] = await Promise.all([
    prisma.permission.upsert({
      where: { name: 'Admin' },
      update: {},
      create: { name: 'Admin', description: 'Manage users and articles' },
    }),
    prisma.permission.upsert({
      where: { name: 'Editor' },
      update: {},
      create: { name: 'Editor', description: 'Manage Articles' },
    }),
    prisma.permission.upsert({
      where: { name: 'Reader' },
      update: {},
      create: { name: 'Reader', description: 'Read-only access to articles' },
    }),
  ]);


  const passwordHash = await bcrypt.hash('root123', 10);
  await prisma.user.upsert({
    where: { email: 'root@local' },
    update: {},
    create: {
      name: 'Root User',
      email: 'root@local',
      passwordHash,
      permissionId: admin.id,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
