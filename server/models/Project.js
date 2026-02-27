const mongoose = require('mongoose');
const _ = require('underscore');

const setName = (name) => _.escape(name).trim();

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },
  tags: [String], // Tags include academic, personal, unity2d, unity3d, website
  images: [String], // holds imageURLs, upload images to a cdn instead
  externalLink: String,
  githubLink: String,
  isFeatured: Boolean, // Very important
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

// TODO: Figure out what this does
ProjectSchema.statics.toAPI = (doc) => ({
  name: doc.name,
});

const ProjectModel = mongoose.model('Project', ProjectSchema);
module.exports = ProjectModel;