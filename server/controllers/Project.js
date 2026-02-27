const models = require('../models');
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const { Project } = models;

const createImgUrls = async (req, res) => {
  const imageUrls = req.files.map(file => {
    return `https://yourcdn.com/${file.filename}`;
  });

  return imageUrls;
}

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
  if (!req.body.name) {
    return res.status(400).json({ error: 'A name is required!' });
  }

  // if(req.body.tags)// check if there are any tags

  if (!req.body.externalLink || !req.body.githubLink) {
    return res.status(400).json({ error: 'A link is required' });
  }

  if (req.files){
    // Upload any images
    upload.array("images", 5);
  }

  const projectData = {
    name: req.body.name, // text input
    tags: req.body.tags, // Have a list of checkboxes
    externalLink: req.body.externalLink, // text input
    githubLink: req.body.githubLink, // text input
    isFeatured: req.body.isFeatured, // Have a checkbox
    images: createImgUrls(req, res), // input file, multiple
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
  // Apply changes if found
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
  if (req.files){
    // Upload any images
    upload.array("images", 5);
    changes.images = createImgUrls(req, res);
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
  updateProject,
};
