const express = require("express");
const router = express.Router();
const donationController = require("../controllers/donation.controller.js"); // Adjust the path as needed

router.get("/", donationController.getDonations);
router.get("/getByProjectId/:id", donationController.getDonationsByProjectId);
router.get("/getByUserId/:id", donationController.getDonationsByUserId);

module.exports = router;
