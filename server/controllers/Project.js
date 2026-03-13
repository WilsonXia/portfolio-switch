const models = require('../models');
const cloudinary = require('cloudinary').v2; // possibly separate, like with multer

const { Project } = models;

// Upload an image
const uploadImages = async (req) => {
  try {
    const { imageFile } = req.files; // destructuring
    console.log(imageFile);
    // return;
    // upload to cloudinary
    const result = await cloudinary.uploader.upload(imageFile.tempFilePath, {folder: req.body.name});
    console.log(JSON.stringify(result));
    // return the address
    return { imgURLS: [result.secure_url] };
  } catch (error) {
    return { error: "Upload failed..." };
  }
}

// Converts req.body into processable changes for MongoDB
const processChanges = (req) => {
  const changes = {
    name: req.body.name,
    tags: req.body.tags.split(',').filter(Boolean),
    externalLink: req.body.externalLink,
    githubLink: req.body.githubLink,
    isFeatured: req.body.isFeatured === 'on',
  };
  return changes;
}

// Checks
const checkProjectData = (project) => {
  if (!project.name) {
    return { error: `No 'name' was sent` };
  }

  // check if there are any tags
  if (project.tags.length <= 0) {
    return { error: `No 'tags' were sent` };
  }

  if (!project.externalLink || !project.githubLink) {
    return { error: `No 'link' was sent` };
  }
  return {};
}

const getProjects = async (req, res) => {
  try {
    const docs = await Project.find({}).lean().exec();
    return res.json({ projects: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving documents!' });
  }
};

const getProject = async (req, res) => {
  try {
    const query = { _id: req.query.projectID };
    const docs = await Project.findOne(query).lean().exec();
    return res.json({ project: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving documents!' });
  }
}

const createProject = async (req, res) => {
  // Check for problems
  const changes = processChanges(req);
  let check = checkProjectData(changes);
  if (check.error) {
    return res.status(400).json(check);
  }

  if (req.files) {
    // TODO: Upload any images
    // uploadImages(req, res);
    const imgRes = await uploadImages(req);
    if(imgRes.error){
      return res.status(500).json(imgRes);
    }
    else{
      changes.images = imgRes.imgURLS;
    }
  }

  try {
    const newProject = new Project(changes);
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
  // Project data should already be loaded onto update form on client side
  // Apply any changes
  // console.log(req.body);
  // Pass checks!
  const changes = processChanges(req);
  let check = checkProjectData(changes);
  if (check.error) {
    return res.status(400).json({ error: check.error });
  }
  // FormData converts all data into string,
  // make sure to convert back to its original format

  if (req.files) {
    // TODO: Upload any images
    // uploadImages(req, res);
    const imgRes = await uploadImages(req);
    if(imgRes.error){
      return res.status(500).json(imgRes);
    }
    else{
      changes.images = imgRes.imgURLS;
    }
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
  getProjects,
  getProject,
  createProject,
  updateProject,
};
