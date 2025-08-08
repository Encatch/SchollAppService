const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.masterDropdown.createMany({
    data: [
      { type: 'occupation', value: 'Engineer' },
      { type: 'occupation', value: 'Doctor' },
      { type: 'occupation', value: 'Teacher' },
      { type: 'occupation', value: 'Lawyer' },
      { type: 'occupation', value: 'Artist' },
      { type: 'gender', value: 'Male' },
      { type: 'gender', value: 'Female' },
      { type: 'gender', value: 'Other' },
    ],
    skipDuplicates: true,
  });
  console.log('Seed data inserted');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 