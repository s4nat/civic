const prisma = require("../../lib/prisma.js"); // Ensure this path is correct for your project setup

exports.getDonations = async () => {
  return prisma.donation.findMany();
};

exports.getDonationsByProjectId = async (id) => {
  return prisma.donation.findMany({
    where: { project_id: id }
  });
};

exports.getDonationsByUserId = async (id) => {
  return prisma.donation.findMany({
    where: { user_id: id },
  });
};

exports.listAllDonations = async () => {
  return prisma.donation.findMany();
};

exports.createDonation = async (data) => {
  return prisma.donation.create({
    data: data,
  });
}
