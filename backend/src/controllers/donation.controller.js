const donationService = require("../services/donation.service.js"); // Adjust the path to where your service file is located

exports.getDonations = async (req, res) => {
  try {
    const donation = await donationService.getDonations();
    const response = {"donations": donation, "totalDonations": donation.length};
    res.json(response);
  } catch (error) {
    res.status(500).json({
      message: "❌ Error retrieving donations",
      error: error.message,
    });
  }
}

exports.getDonationsByProjectId = async (req, res) => {
  try {
    const id  = parseInt(req.params.id);
    const donation = await donationService.getDonationsByProjectId(id);
    if (donation) {
      res.json(donation);
    } else {
      res.status(404).json({ message: "Donation by project ID not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "❌ Error retrieving Donation by Project ID",
      error: error.message,
    });
  }
};

exports.getDonationsByUserId = async (req, res) => {
  try {
    const id  = parseInt(req.params.id);
    const donation = await donationService.getDonationsByUserId(id);
    if (donation) {
      res.json(donation);
    } else {
      res.status(404).json({ message: "Donation by User ID not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "❌ Error retrieving Donation by User ID",
      error: error.message,
    });
  }
};
