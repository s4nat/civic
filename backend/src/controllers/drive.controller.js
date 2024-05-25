// controller.js
const driveService = require("../services/drive.service.js"); // Adjust path as necessary


exports.listAllDrives = async (req, res) => {
  try {
    console.log("Requesting all drives");
    const drive = await driveService.listAllDrives();
    res.json(drive);
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Error listing drive", error: error.message });
  }
};


exports.getDriveById = async (req, res) => {
  try {
    console.log("Requesting drive with ID:", req.params.id);
    const drive = await driveService.getDriveById(
      req.params.id   
    );
    if (drive) {
      res.json(drive);
    } else {
      res.status(404).json({ message: "Drive not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "❌ Error retrieving drive by ID",
      error: error.message,
    });
  }
};

exports.getAvailableFundingByDriveId = async (req, res) => {
  try {
    console.log("Requesting available funding for drive with ID:", req.params.id);
    const drive = await driveService.getAvailableFundingByDriveId(
      req.params.id   
    );
    if (drive) {
      res.json(drive);
    } else {
      res.status(404).json({ message: "Drive not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "❌ Error retrieving available funding by drive ID",
      error: error.message,
    });
  }
}
