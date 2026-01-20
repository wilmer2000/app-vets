import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './generated/prisma/client.js';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL as string,
});
const prisma = new PrismaClient({ adapter });

const clientData: any = {
  email: 'client@email.com',
};

const petData: any = {
  name: 'Rayo 2',
  breed: 'Kelpie',
  sex: 'MALE',
};

const enityData = {
  isActive: 'false',
  name: 'Entity 2 name',
  description: 'Entity 2 description',
  address: {
    city: 'City 2',
  },
};

const staffData: any = {
  email: 'staff@email.com',
  specialty: 'DERMATOLOGY',
};

async function main() {
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
