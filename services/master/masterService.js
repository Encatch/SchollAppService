const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createDropdown = async (type, value) => {
  const result = await prisma.masterDropdown.create({
    data: { type, value },
  });
  return result;
};


const getDropdownByType = async (type) => {
  return await prisma.masterDropdown.findMany({
    where: { type },
    select: { id: true, value: true },
  });
};

module.exports = {
  createDropdown,
  getDropdownByType,
}; 