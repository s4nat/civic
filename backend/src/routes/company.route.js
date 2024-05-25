const express = require("express");
const router = express.Router();
const companyController = require("../controllers/company.controller.js");

router.get("/", companyController.getAllCompanies);
router.post("/createCompany", companyController.createCompany);
router.get("/fundAmountByCategory", companyController.getFundAmountByCategory);

module.exports = router;
