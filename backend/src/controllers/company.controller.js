const companyService = require("../services/company.service.js");
const prisma = require("../../lib/prisma.js");

exports.createCompany = async (req, res) => {
  console.log("Received request body:", req.body);
  try {
    const companyData = { ...req.body };

    console.log(companyData);
    // Proceed to create the anomaly with the provided data
    const newCompany = await companyService.createCompany(companyData);
    res.json(newCompany);
  } catch (error) {
    console.error("❌ Failed to send email or create anomaly:", error);

    if (error.response) {
      console.error("Response body:", error.response.body);
    }

    res.status(500).json({
      message: "❌ Error sending email or creating anomaly",
      error: error.message,
    });
  }
};
exports.updateAnomalyActionTaken = async (req, res) => {
  try {
    const { id, action_taken } = req.body;

    if (action_taken) {
      const anomaly = await prisma.anomaly.findUnique({
        where: { id },
        include: {
          device: {
            include: {
              user: true,
            },
          },
        },
      });

      if (!anomaly) {
        return res.status(404).json({ message: "Anomaly not found." });
      }

      const { device_label, timestamp_start, timestamp_end } = anomaly;
      const userName = anomaly.device.user.name;

      const msg = {
        to: process.env.SERVICE_EMAIL_ADDRESS,
        from: process.env.SENDGRID_VERIFIED_SENDER,
        subject: "Service Scheduled Notification",
        text: `A service has been scheduled by ${userName} for device ${device_label}. Anomaly detected from ${timestamp_start} to ${timestamp_end}.`,
        html: `<p>A service has been scheduled by <strong>${userName}</strong> for device <strong>${device_label}</strong>. Anomaly detected from <strong>${timestamp_start}</strong> to <strong>${timestamp_end}</strong>.</p>`,
      };

      // Send the email
      await sgMail.send(msg);
      console.log("Email sent successfully.");
    }

    // Update the anomaly action taken status
    const updatedAnomaly = await companyService.updateActionTaken(
      id,
      action_taken
    );
    res.json(updatedAnomaly);
  } catch (error) {
    console.error("❌ Failed to send email or update anomaly:", error);
    res.status(500).json({
      message: "❌ Error updating action taken for anomaly or sending email",
      error: error.message,
    });
  }
};

exports.updateAnomalyValidity = async (req, res) => {
  try {
    const { id, valid_anomaly } = req.body;
    const updatedAnomaly = await companyService.updateAnomaly(id, {
      valid_anomaly,
    });
    res.json(updatedAnomaly);
  } catch (error) {
    res.status(500).json({
      message: "❌ Error updating anomaly validity",
      error: error.message,
    });
  }
};

exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await companyService.listAllCompanies();
    res.json(anomalies);
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Error retrieving anomalies", error: error.message });
  }
};

exports.listAnomaliesByDevice = async (req, res) => {
  try {
    const { deviceLabel } = req.params;
    const anomalies = await companyService.listAnomaliesByDeviceLabel(
      deviceLabel
    );
    res.json(anomalies);
  } catch (error) {
    res.status(500).json({
      message: "❌ Error retrieving anomalies by device label",
      error: error.message,
    });
  }
};

exports.listAnomaliesLast24Hours = async (req, res) => {
  try {
    const { deviceLabel } = req.params;
    const anomalies = await companyService.listAnomaliesByTimeFrame(
      deviceLabel,
      24
    );
    res.json(anomalies);
  } catch (error) {
    res.status(500).json({
      message: "❌ Error retrieving anomalies for the last 24 hours",
      error: error.message,
    });
  }
};

exports.listAnomaliesLast48Hours = async (req, res) => {
  try {
    const { deviceLabel } = req.params;
    const anomalies = await companyService.listAnomaliesByTimeFrame(
      deviceLabel,
      48
    );
    res.json(anomalies);
  } catch (error) {
    res.status(500).json({
      message: "❌ Error retrieving anomalies for the last 48 hours",
      error: error.message,
    });
  }
};
