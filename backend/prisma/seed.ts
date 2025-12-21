import { PrismaClient } from './generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';
import { UserCreateInput } from './generated/prisma/models/User.js';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL as string,
});
const prisma = new PrismaClient({ adapter });
const userData: UserCreateInput[] = [
  {
    email: 'admin@admin.com',
    password: 'password',
    role: 'ADMIN',
  },
];

async function main() {
  const hasUsers = await prisma.user.count();
  if (hasUsers > 0) {
    console.log(`Users already exist. Skipping seeding.`);
    return;
  }

  for (const u of userData) {
    const salt: string = await bcrypt.genSalt(10);
    const hashedPassword: string = await bcrypt.hash(u.password, salt);

    const data = {
      email: u.email,
      password: hashedPassword,
      role: u.role,
    };

    const user = await prisma.user.create({ data });
    console.log(`Created user ${user.name} with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
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
