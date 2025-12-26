import { PrismaClient, Role } from './generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';
import { UserCreateInput } from './generated/prisma/models/User.js';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL as string,
});
const prisma = new PrismaClient({ adapter });
const userData: UserCreateInput[] = [
  {
    email: 'admin@email.com',
    password: 'passwordTest',
    name: 'Admin',
    lastname: 'Admin',
    role: Role.ADMIN,
  },
  {
    email: 'user@email.com',
    password: 'passwordTest',
    name: 'User',
    lastname: 'User',
    role: Role.USER,
  },
  {
    email: 'vet@email.com',
    password: 'passwordTest',
    name: 'Vet',
    lastname: 'Vet',
    role: Role.VET,
  },
  {
    email: 'owner@email.com',
    password: 'passwordTest',
    name: 'Owner',
    lastname: 'Owner',
    role: Role.OWNER,
  },
];

async function main() {
  const hasUsers = await prisma.user.count();
  if (hasUsers > 0) {
    console.log(`Users already exist. Skipping seeding.`);
    return;
  }

  for (const u of userData) {
    if (!u.password) {
      console.error(`Skipping user ${u.email}: password is missing`);
      continue;
    }

    const salt: string = await bcrypt.genSalt(10);
    const hashedPassword: string = await bcrypt.hash(u.password, salt);

    const data = {
      ...u,
      password: hashedPassword,
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
