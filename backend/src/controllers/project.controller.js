const projectService = require("../services/project.service.js");
const donationService = require("../services/donation.service.js");

exports.createProject = async (req, res) => {
  try {
    const projectData = req.body;
    const project = await projectService.createProject(projectData);
    res.status(200).json(project);
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Failed to create project", error: error.message });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const project = await projectService.getProjects();
    res.json(project);
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Failed to retrieve projects", error: error.message });
  }
};


exports.getProjectById = async (req, res) => {
  try {
    const projectId  = parseInt(req.params.id);
    const project = await projectService.getProjectById(projectId);
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ message: "👀 project not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Failed to retrieve Project", error: error.message });
  }
};

exports.getProjectByUser = async (req, res) => {
  try {
    const userId  = parseInt(req.params.id);
    const project = await projectService.getProjectByUserId(userId);
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ message: "👀 Project not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Failed to retrieve Project", error: error.message });
  }
};

exports.getProjectByDriveId = async (req, res) => {
  try {
    const driveId  = req.params.id; 
    const project = await projectService.getProjectByDriveId(driveId);
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ message: "👀 project not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Failed to retrieve project", error: error.message });
  }
};

exports.updateProjectDonations = async (req, res) => {
  try {
    const updateAmount = req.body.amount;
    const userId = req.body.user_id;
    const projectId = parseInt(req.params.id);

    // Update the donation table
    const dump = await donationService.createDonation({
      donation_amount: updateAmount,
      user_id: userId,
      project_id: projectId,
    });

    // Get the existing project data
    console.log("Updating", updateAmount, "for", "project", projectId)
    const project = await projectService.getProjectById(projectId);
    if (!project) {
      return res.status(404).json({ message: "👀 project not found" });
    }

    // Get the total donations for the project
    let donationsAmount = 0;
    const response = await donationService.getDonationsByProjectId(projectId);
    for (let i = 0; i < response.length; i++) {
      donationsAmount += response[i].donation_amount;
    }
    project.project_donations =  donationsAmount;

    const updatedProject = await projectService.updateProjectDonations(
      projectId,
      project // project with the updated donations field
    );
    res.json(updatedProject);
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Failed to update project", error: error.message });
  }
};
