const models = require('../models');

const { Project } = models;

const creatorPage = (req, res) => {
  return res.render('app');
};

const getProjects = async (req, res) => {
  try {
    const docs = await Project.find({}).lean().exec();
    return res.json({ projects: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving documents!' });
  }
};

const createProject = async (req, res) => {
  if (!req.body.name || !req.body.engineType || req.body.projectType) {
    return res.status(400).json({ error: 'These fields are required!' });
  }

  if (!req.body.externalLink || !req.body.githubLink) {
    return res.status(400).json({ error: 'A link is required' });
  }

  const projectData = {
    name: req.body.name,
    engineType: req.body.engineType,
    projectType: req.body.projectType,
    externalLink: req.body.externalLink,
    githubLink: req.body.githubLink,
    imageURL: req.body.imageURL // TODO: Figure out how to parse images and send them to Firebase
  };

  try {
    const newProject = new Project(projectData);
    await newProject.save();
    return res.status(201).json({ name: newProject.name, projectID: newProject._id });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'That project already exists' });
    }
    return res.status(500).json({ error: 'An error occured making this project' });
  }
};

const updateProject = async (req, res) => {
  // Check if the edits are there
  // Editable values: All links, image, project and engine type, name
  if (!req.body.name || !req.body.engineType || req.body.projectType) {
    return res.status(400).json({ error: 'These fields are required!' });
  }

  if (!req.body.externalLink || !req.body.githubLink) {
    return res.status(400).json({ error: 'A link is required' });
  }
  // Find change rules
  const changes = {};
  if (req.body.name) {
    changes.name = req.body.name;
  }
  if (req.body.engineType) {
    changes.engineType = req.body.engineType;
  }
  if (req.body.projectType) {
    changes.projectType = req.body.projectType;
  }
  if (req.body.externalLink) {
    changes.externalLink = req.body.externalLink;
  }
  if (req.body.githubLink) {
    changes.githubLink = req.body.githubLink;
  }

  const query = { _id: req.body.projectID };
  try {
    // Fetch the currently selected Project and update it
    const doc = await Project.findOneAndUpdate(
      query,
      {
        $set: changes,
      },
      { returnDocument: 'after' },
    ).lean().exec();
    return res.json({ project: doc });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error editing decription...' });
  }
}

module.exports = {
  creatorPage,
  getProjects,
  createProject,
  updateProject
};
