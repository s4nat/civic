const prisma = require("../../lib/prisma.js");

exports.createCompany = async (companyData) => {
  return prisma.company.create({ data: companyData });
};

exports.listAllCompanies = async () => {
  return prisma.company.findMany();
};

exports.getFundAmountByCategory = async () => {
  return prisma.company.groupBy({
    by: ["fund_target_category"],
    _sum: { fund_amount: true }
  });
}