const helper = require('./helper.js');
const React = require('react');
const { useState, useEffect } = React;
const { ProjectTagSelector } = require('./ProjectTagSelector.jsx');

const handleCreateProject = (e, props, onProjectAdded) => {
    e.preventDefault();
    helper.hideError();

    const name = e.target.querySelector('#projectName').value;
    const externalLink = e.target.querySelector('#projectExternalLink').value;
    const githubLink = e.target.querySelector('#projectGithubLink').value;
    if (!name) {
        helper.handleError('A Name is required');
        return false;
    }
    console.log(props);
    if(props.tags.length <= 0){
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

const ProjectForm = (props) => {
    const [tags, setTags] = useState([]);
    const [images, setImages] = useState([]);
    const [isFeatured, setIsFeatured] = useState(false);
    return (
        <form id="projectForm"
            onSubmit={(e) => handleCreateProject(e, {tags, isFeatured, images}, props.triggerReload)}
            action="/create"
            method="POST"
            encType="multipart/form-data"
            className="projectForm"
        >
            <label>Name: </label>
            <input type="text" id="projectName" placeholder="Name" />
            <ProjectTagSelector selected={tags} setSelected={setTags}/>
            <label>Link to Project: </label>
            <input type="text" id="projectExternalLink" placeholder="Link" />
            <label>Link to Github: </label>
            <input type="text" id="projectGithubLink" placeholder="Link" />
            <label>Is Featured: </label>
            <input type='checkbox' id="projectIsFeatured" checked={isFeatured} onChange={()=>{setIsFeatured(!isFeatured)}}/>
            <label>Upload Images: </label>
            <input
                id="projectImageUploader"
                type="file"
                multiple accept=".png, .jpg"
                onChange={(e) => setImages(e.target.files)} // this a hook for files
            />
            <input className='projectSubmit' type='submit' value="Create Project" />
        </form>
    )
}

module.exports = {ProjectForm};