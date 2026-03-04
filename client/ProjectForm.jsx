const helper = require('./helper.js');
const React = require('react');
const { useState, useEffect } = React;
const { TextInput } = require('./TextInput.jsx');
const { ProjectTagSelector } = require('./ProjectTagSelector.jsx');

const handleCreateProject = (e, props, onProjectAdded) => {
    e.preventDefault();
    helper.hideError();

    // TODO: Fix this up for FormData
    // Checks
    const name = e.target.querySelector('#createName').value;
    const externalLink = e.target.querySelector('#createExternalLink').value;
    const githubLink = e.target.querySelector('#createGithubLink').value;
    if (!name) {
        helper.handleError('A Name is required');
        return false;
    }

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

    helper.sendPostFile(e.target.action, sendData, onProjectAdded);
    return false;
}

const handleUpdateProject = (e, props, onProjectChanged) => {
    e.preventDefault();
    helper.hideError();

    const formData = new FormData(e.target);
    formData.append("tags", props.tags);
    formData.append("isFeatured", props.isFeatured);
    formData.append("projectID", props.projectID);

    console.log("Data sent vvvvvv");
    console.log(formData);

    // TODO: Add checks
    helper.sendPostFile(e.target.action, formData, onProjectChanged);
    return false;
}

const ProjectForm = (props) => {
    const [project, setProject] = useState({});
    const [tags, setTags] = useState([]);
    const [images, setImages] = useState([]);
    const [isFeatured, setIsFeatured] = useState(false);

    const formChanges = {};
    formChanges.handler = props.action === "create" ? handleCreateProject : handleUpdateProject;
    formChanges.submit = props.action === "create" ? "Create" : "Submit";
    formChanges.props = props.action === "create" ? { tags, isFeatured, images }
        : { tags, isFeatured, images, projectID: props.projectID };

    useEffect(() => {
        const loadProjectFromServer = async () => {
            // const qParams = {projectID: props.projectID};
            const response = await fetch(`/getProject?projectID=${props.projectID}`, {
                method: 'GET',
            });
            const data = await response.json();
            console.log("data obtained");
            console.log(data);
            setProject(data.project);
            setTags(data.project.tags);
            setIsFeatured(data.project.isFeatured);
        };
        // Read project data if it exists
        if (props.projectID) {
            loadProjectFromServer();
        }
    }, [props.reloadProjectState]); // Dependency, will trigger effect on change

    return (
        <form id={props.action + "Form"}
            onSubmit={(e) => formChanges.handler(e, formChanges.props, props.triggerReload)}
            action={"/" + props.action}
            method="POST"
            encType="multipart/form-data"
            className={props.action + "Form"}
        >
            <TextInput inputName={"Name"} placeholder={"Enter a name..."} action={props.action} />
            <ProjectTagSelector selected={tags} setSelected={setTags} />
            <TextInput inputName={"External Link"} placeholder={"Link"} action={props.action} />
            <TextInput inputName={"Github Link"} placeholder={"Link"} action={props.action} />
            <label>Is Featured: </label>
            <input type='checkbox' id={props.action + "IsFeatured"} name="isFeatured" checked={isFeatured} onChange={() => { setIsFeatured(!isFeatured) }} />
            <label>Upload Images: </label>
            <input
                id={props.action + "ImageUploader"}
                type="file"
                multiple accept=".png, .jpg"
                name='imageFile'
                onChange={(e) => setImages(e.target.files)} // this a hook for files
            />
            <input className='submitBtn' type='submit' value={formChanges.submit} />
        </form>)
}

module.exports = { ProjectForm };