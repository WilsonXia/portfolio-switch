const models = require('../models');
const cloudinary = require('cloudinary').v2; // possibly separate, like with multer

const { Project } = models;

// Upload an image
const uploadImages = async (req, res) => {
  try {
    const { imageFile } = req.files; // destructuring
    console.log(imageFile.name);

    // const files = req.files;
    // const uploadPromises = files.map((file) => {
    //   return new Promise <string> ((resolve, reject) => {
    //     const stream = cloudinary.uploader.upload_stream(
    //       { folder: req.body.name }, // make a folder of imgs for that project
    //       (error, result) => {
    //         if (error || !result) reject(error);
    //         else resolve(result.secure_url);
    //       }
    //     );
    //     stream.end(file.buffer);
    //   });
    // });

    // const imageUrls = await Promise.all(uploadPromises);
    // return imageUrls;
  } catch (error) {
    return res.status(500).json({ message: "Upload failed..." });
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
  // console.log(req.body);
  // console.log(req.files);
  let imagesPlaceholder;
  if (!req.body.name) {
    return res.status(400).json({ error: 'A name is required!' });
  }

  // check if there are any tags
  if (req.body.tags.length <= 0) {
    return res.status(400).json({ error: 'A single tag is required!' });
  }

  if (!req.body.externalLink || !req.body.githubLink) {
    return res.status(400).json({ error: 'A link is required' });
  }

  if (req.files) {
    // TODO: Upload any images
    imagesPlaceholder = uploadImages(req, res);
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
  // Project data should already be loaded onto update form on client side
  // Apply any changes
  // Pass checks!
  if (!req.body.name) {
    return res.status(400).json({ error: 'A name is required!' });
  }

  // check if there are any tags
  if (req.body.tags.length <= 0) {
    return res.status(400).json({ error: 'A single tag is required!' });
  }

  if (!req.body.externalLink || !req.body.githubLink) {
    return res.status(400).json({ error: 'A link is required' });
  }
  // FormData converts all data into string,
  // make sure to convert back to its original format
  const changes = {
    name: req.body.name,
    tags: req.body.tags.split(','),
    externalLink: req.body.externalLink,
    githubLink: req.body.githubLink,
    isFeatured: req.body.isFeatured,
  };

  // if (reqData.name) {
  //   changes.name = reqData.name;
  // }
  // if (reqData.tags) {
  //   changes.tags = reqData.tags;
  // }
  // if (reqData.externalLink) {
  //   changes.externalLink = reqData.externalLink;
  // }
  // if (reqData.githubLink) {
  //   changes.githubLink = reqData.githubLink;
  // }
  // if (reqData.isFeatured) {
  //   changes.isFeatured = reqData.isFeatured;
  // }
  if (req.files) {
    // Upload any images
    uploadImages(req, res);
    // changes.images = uploadImages(req, res);
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
  getProject,
  createProject,
  updateProject,
};
