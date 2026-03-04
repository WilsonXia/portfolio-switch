const helper = require('./helper.js');
const React = require('react');
const { useState, useEffect } = React;
const { ProjectTagSelector } = require('./ProjectTagSelector.jsx');

const handleCreateProject = (e, props, onProjectAdded) => {
    e.preventDefault();
    helper.hideError();

    const name = e.target.querySelector('#createName').value;
    const externalLink = e.target.querySelector('#createExternalLink').value;
    const githubLink = e.target.querySelector('#createGithubLink').value;
    if (!name) {
        helper.handleError('A Name is required');
        return false;
    }
    console.log(props);
    if (props.tags.length <= 0) {
        helper.handleError('A single tag is required');
        return false;
    }

    if (!externalLink || !githubLink) {
        helper.handleError('A link is required');
        return false;
    }
    const sendData = {
        name,
        tags: props.tags,
        externalLink,
        githubLink,
        isFeatured: props.isFeatured,
        images: props.images,
    }
    // console.log(sendData);

    helper.sendPost(e.target.action, sendData, onProjectAdded);
    return false;
}

const handleUpdateProject = (e, props, onProjectChanged) => {
    e.preventDefault();
    helper.hideError();

    const name = e.target.querySelector('#updateName').value;
    const externalLink = e.target.querySelector('#updateExternalLink').value;
    const githubLink = e.target.querySelector('#updateGithubLink').value;
    
    const sendData = {
        name,
        projectID: props.id,
        tags: props.tags,
        externalLink,
        githubLink,
        isFeatured: props.isFeatured,
        images: props.images,
    }
    console.log(sendData);

    helper.sendPost(e.target.action, sendData, onProjectChanged);
    return false;
}

const ProjectForm = (props) => {
    const [tags, setTags] = useState([]);
    const [images, setImages] = useState([]);
    const [isFeatured, setIsFeatured] = useState(false);

    const formChanges = {};
    formChanges.handler = props.action === "create" ? handleCreateProject : handleUpdateProject;
    formChanges.submit = props.action === "create" ? "Create" : "Submit";
    formChanges.props = props.action === "create" ? { tags, isFeatured, images } 
    : { tags, isFeatured, images, projectID: props.projectID };

    return (<form id={props.action + "Form"}
        onSubmit={(e) => formChanges.handler(e, formChanges.props, props.triggerReload)}
        action={"/" + props.action}
        method="POST"
        encType="multipart/form-data"
        className={props.action + "Form"}
    >
        <label>Name: </label>
        <input type="text" id={props.action + "Name"} placeholder="Name" />
        <ProjectTagSelector selected={tags} setSelected={setTags} />
        <label>Link to Project: </label>
        <input type="text" id={props.action + "ExternalLink"} placeholder="Link" />
        <label>Link to Github: </label>
        <input type="text" id={props.action + "GithubLink"} placeholder="Link" />
        <label>Is Featured: </label>
        <input type='checkbox' id={props.action + "IsFeatured"} checked={isFeatured} onChange={() => { setIsFeatured(!isFeatured) }} />
        <label>Upload Images: </label>
        <input
            id={props.action + "ImageUploader"}
            type="file"
            multiple accept=".png, .jpg"
            onChange={(e) => setImages(e.target.files)} // this a hook for files
        />
        <input className='submitBtn' type='submit' value={formChanges.submit} />
    </form>)
}

module.exports = { ProjectForm };