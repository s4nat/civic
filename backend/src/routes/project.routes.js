const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project.controller.js");

// Device routes
router.post("/createProject", projectController.createProject); // Create a new project
router.get("/getProjects", projectController.getProjects); // Get all projects
router.get("/getProject/:id", projectController.getProjectById); // Get a specific project by project ID
router.get("/getProjectByUser/:id", projectController.getProjectByUser); // Get a specific project by user ID
router.get("/getProjectByDriveId/:id", projectController.getProjectByDriveId); // Get a specific project by drive ID
router.post("/updateProjectDonations/:id", projectController.updateProjectDonations); // Set ID of project in url. Send amount in body.  
router.post("/updateProjectMatchAmount/:id", projectController.updateProjectMatchAmount); // Set ID of project in url. Send amount in body.

module.exports = router;
