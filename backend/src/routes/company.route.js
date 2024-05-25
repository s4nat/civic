const express = require("express");
const router = express.Router();
const companyController = require("../controllers/company.controller.js");
router.get("/", companyController.getAllCompanies);
router.post("/createCompany", companyController.createCompany);



router.patch("/:id/updateAction", companyController.updateAnomalyActionTaken);
router.patch("/:id/updateValidity", companyController.updateAnomalyValidity);
router.get("/:deviceLabel", companyController.listAnomaliesByDevice);
router.get(
  "/:deviceLabel/last24hours",
  companyController.listAnomaliesLast24Hours
);
router.get(
  "/:deviceLabel/last48hours",
  companyController.listAnomaliesLast48Hours
);

module.exports = router;
