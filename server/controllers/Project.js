const models = require('../models');
const multer = require("../multer");
const cloudinary = require('cloudinary').v2; // possibly separate, like with multer

const { Project } = models;
const { upload } = multer;

// Upload an image
const uploadImages = async (req, res) => {
  try {
    const files = req.files;
    const uploadPromises = files.map((file) => {
      return new Promise <string> ((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: req.body.name }, // make a folder of imgs for that project
          (error, result) => {
            if (error || !result) reject(error);
            else resolve(result.secure_url);
          }
        );
        stream.end(file.buffer);
      });
    });

    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls;
  } catch (error) {
    return res.status(500).json({ message: "Upload failed" });
  }
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
  console.log(req.body);
  console.log(req.files);
  let imagesPlaceholder;
  if (!req.body.name) {
    return res.status(400).json({ error: 'A name is required!' });
  }
  
  // check if there are any tags
  if(req.body.tags.length <= 0){
    return res.status(400).json({ error: 'A single tag is required!' });
  }

  if (!req.body.externalLink || !req.body.githubLink) {
    return res.status(400).json({ error: 'A link is required' });
  }

  if (req.files) {
    // Upload any images
    upload.array("images", 5);
    imagesPlaceholder = uploadImages(req,res);
  }


  const projectData = {
    name: req.body.name, // text input
    tags: req.body.tags, // Have a list of checkboxes
    externalLink: req.body.externalLink, // text input
    githubLink: req.body.githubLink, // text input
    isFeatured: req.body.isFeatured, // Have a checkbox
    images: imagesPlaceholder, // input file, multiple
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
  if (req.body.tags) {
    changes.tags = req.body.tags;
  }
  if (req.body.externalLink) {
    changes.externalLink = req.body.externalLink;
  }
  if (req.body.githubLink) {
    changes.githubLink = req.body.githubLink;
  }
  if (req.body.isFeatured) {
    changes.isFeatured = req.body.isFeatured;
  }
  if (req.files) {
    // Upload any images, TODO: update images
    upload.array("images", 5);
    changes.images = uploadImages(req, res);
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
