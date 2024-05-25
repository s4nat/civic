// routes.js
const express = require("express");
const router = express.Router();
const driveController = require("../controllers/drive.controller.js");

router.get("/", driveController.listAllDrives);
router.get("/:id", driveController.getDriveById);
router.get("/getAvailableFundingByDriveId/:id", driveController.getAvailableFundingByDriveId);

module.exports = router;