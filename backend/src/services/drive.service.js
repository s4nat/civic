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
