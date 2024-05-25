const companyService = require("../services/company.service.js");
const driveService = require("../services/drive.service.js");

exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await companyService.listAllCompanies();
    res.json(companies);
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Error retrieving companies", error: error.message });
  }
};

exports.createCompany = async (req, res) => {
  console.log("Received request body:", req.body);
  try {
    const companyData = { ...req.body };

    console.log(companyData);
    // Proceed to create the company with the provided data
    const newCompany = await companyService.createCompany(companyData);
    res.json(newCompany);
  } catch (error) {
    console.error("❌ Failed to send email or create company:", error);

    if (error.response) {
      console.error("Response body:", error.response.body);
    }

    res.status(500).json({
      message: "❌ Error sending email or creating company",
      error: error.message,
    });
  }
};

exports.getFundAmountByCategory = async (req, res) => {
  try {
    const fundAmountByCategory = await companyService.getFundAmountByCategory();
    fundAmountByCategory.forEach( (struct) => {
      const category = struct.fund_target_category;
      const fundAmountPerMonth = struct._sum.fund_amount / 12;
      driveService.updateDriveAmountByCategory(category, fundAmountPerMonth);
    });
    res.json(fundAmountByCategory);
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Error retrieving fund amount by category", error: error.message });
  }
}