const prisma = require("../../lib/prisma.js");

exports.createProject = async (projectData) => {
  return prisma.project.create({
    data: projectData,
  });
};

exports.getProjects = async () => {
  return prisma.project.findMany();
};

exports.getProjectById = async (projectId) => {
  return prisma.project.findUnique({
    where: { project_id: projectId }
  });
};

exports.getProjectByUserId = async (userId) => {
  return prisma.project.findMany({
    where: { user_id: userId }
  });
};

exports.getProjectByDriveId = async (driveId) => {
  return prisma.project.findMany({
    where: { drive_id: driveId }
  });
};

exports.updateProjectDonations = async (projectId, project) => {
  return prisma.project.update({
    where: { project_id : projectId },
    data: project,
  });
};

exports.updateProjectMatchAmount = async (projectId, updateAmount) => {
  return prisma.project.update({
    where: { project_id : projectId },
    data: { project_match_amount: updateAmount },
  });
};

exports.listAllProjects = async () => {
  return prisma.device.findMany({
    select: {
      id: true,
      device_label: true,
      user_id: true,
      // Exclude related entities from the result
      anomalies: false,
      datastreams: false,
      sagemakerAnomalies: false,
    },
  });
};
