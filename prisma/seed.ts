import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  // Create permissions
  const [admin, editor, reader] = await Promise.all([
    prisma.permission.upsert({
      where: { name: 'Admin' },
      update: {},
      create: {
        name: 'Admin',
        description: 'Full access to users and articles',
      },
    }),
    prisma.permission.upsert({
      where: { name: 'Editor' },
      update: {},
      create: { name: 'Editor', description: 'Manage articles' },
    }),
    prisma.permission.upsert({
      where: { name: 'Reader' },
      update: {},
      create: { name: 'Reader', description: 'Read-only access to articles' },
    }),
  ]);

  // Create root user (admin)
  const password = 'root123';
  const passwordHash = await bcrypt.hash(password, 10);

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

  // Example article from root
  await prisma.article.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Welcome',
      content: 'Initial article created by seed.',
      author: { connect: { email: 'root@local' } },
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
