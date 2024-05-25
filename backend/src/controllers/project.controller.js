const projectService = require("../services/project.service.js"); // Adjust the path as needed

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
    const projectId  = parseInt(req.params.id); // Assuming projectLabel is a URL parameter
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
    const userId  = parseInt(req.params.id); // Assuming projectLabel is a URL parameter
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
    const driveId  = req.params.id; // Assuming projectLabel is a URL parameter
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
    const updateAmount = req.body.amount; // Assuming deviceLabel is a URL parameter
    const projectId = parseInt(req.params.id);
    console.log("Updating", updateAmount, "for", "project", projectId)
    const project = await projectService.getProjectById(projectId);
    if (!project) {
      return res.status(404).json({ message: "👀 project not found" });
    }
    project.project_donations += updateAmount;

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
