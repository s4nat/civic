// services.js
const prisma = require("../../lib/prisma.js");


exports.listAllDrives = async () => {
  return prisma.drive.findMany();
};

exports.getDriveById = async (id) => {
  return prisma.drive.findUnique({
    where: {drive_id: id}
  });
};

exports.updateDriveAmountByCategory = async (category, fundAmountPerMonth) => {
  return prisma.drive.updateMany({
    where: {drive_category: category},
    data: {drive_amount: fundAmountPerMonth}
  });
}

exports.getAvailableFundingByDriveId = async (id) => {
  return prisma.drive.findUnique({
    where: { drive_id: id },
    select: {
      drive_id: true,
      drive_amount: true
    }
  });
}
