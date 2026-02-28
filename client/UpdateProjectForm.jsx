const helper = require('./helper.js');
const React = require('react');
const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');

// TODO: FIX THIS FOR PROJECTS
const handleUpdateProject = (e, id, onProjectChanged) => {
    e.preventDefault();
    helper.hideError();

    const greeting = e.target.querySelector('#domoGreeting').value;
    const projectID = id;

    if (!greeting) {
        helper.handleError('A greeting is required');
        return false;
    }

    helper.sendPost(e.target.action, { domoID: projectID, greeting }, onProjectChanged);
    return false;
}

const UpdateProjectForm = (props) => {
    return (
        <form id="updateForm"
            onSubmit={(e) => handleUpdateProject(e, props.projectID, props.triggerReload)}
            name='updateForm'
            action='/updateProject'
            method='POST'
            className='updateForm'
        >
            <label htmlFor="greeting">Update Project</label>
            <label htmlFor="name">Name: </label>
            <input type="text" id="projectName" name="name" placeholder="Name" />
            <label htmlFor="externalLink">Link to Project: </label>
            <input type="text" id="projectExternalLink" name="externalLink" placeholder="Link" />
            <label htmlFor="githubLink">Link to Github: </label>
            <input type="text" id="projectGithubLink" name="githubLink" placeholder="Link" />
            <label htmlFor="images">Upload Images: </label>
            <input
                id="projectImages"
                type="file"
                multiple accept=".png, .jpg"
            // onChange={(e) => setFiles(e.target.files)} // this a hook for files
            />
            <input type='submit' value="Submit" />
        </form>
    );
}

module.exports = {UpdateProjectForm};