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
  engineType: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },
  projectType: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },
  externalLink: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },
  githubLink: {
    type: String,
    trim: true,
    set: setName,
  },
  imageURL: {
    type: String,
    trim: true,
    set: setName,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

ProjectSchema.statics.toAPI = (doc) => ({
  name: doc.name,
});

const ProjectModel = mongoose.model('Project', ProjectSchema);
module.exports = ProjectModel;