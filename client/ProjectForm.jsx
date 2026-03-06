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

    const formData = new FormData(e.target);
    formData.append("tags", props.tags);
    formData.append("projectID", props.projectID);

    console.log("Data sent vvvvvv");
    console.log(formData);

    helper.sendPostFile(e.target.action, formData, onProjectAdded);
    return false;
}

const handleUpdateProject = (e, props, onProjectChanged) => {
    e.preventDefault();
    helper.hideError();

    const formData = new FormData(e.target);
    formData.append("tags", props.tags);
    formData.append("projectID", props.projectID);

    console.log("Form sent vvvvvv");
    helper.debugFormData(formData);

    // TODO: Add checks
    helper.sendPostFile(e.target.action, formData, onProjectChanged);
    return false;
}

const ProjectForm = (props) => {
    const [project, setProject] = useState({
        name: '',
        tags: [],
        images: [],
        externalLink: '',
        githubLink: '',
        isFeatured: false, // Very important
        createdDate: {},
    });

    // Handle project changes
    const handleTextChange = (e) => {
        // Access the htmlElement's attributes
        // Use those to update the project
        const { name, value } = e.target;
        setProject({
            ...project,
            [name]: value
        });
    }
    const [tags, setTags] = useState([]);
    const [images, setImages] = useState([]);
    // const [isFeatured, setIsFeatured] = useState(false);

    const formChanges = {};
    formChanges.handler = props.action === "create" ? handleCreateProject : handleUpdateProject;
    formChanges.submit = props.action === "create" ? "Create" : "Submit";
    formChanges.props = props.action === "create" ? { tags, images }
        : { tags, images, projectID: props.projectID };

    useEffect(() => {
        const loadProjectFromServer = async () => {
            // const qParams = {projectID: props.projectID};
            const response = await fetch(`/getProject?projectID=${props.projectID}`, {
                method: 'GET',
            });
            const data = await response.json();
            console.log("data loaded");

            setProject(data.project);
            setTags(data.project.tags);
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
            <TextInput inputName={"Name"} placeholder={"Enter a name..."} value={project.name}
                action={props.action} onChange={handleTextChange} />

            <ProjectTagSelector selected={tags} setSelected={setTags} />

            <TextInput inputName={"External Link"} placeholder={"Link"} value={project.externalLink}
                action={props.action} onChange={handleTextChange} />

            <TextInput inputName={"Github Link"} placeholder={"Link"} value={project.githubLink}
                action={props.action} onChange={handleTextChange} />

            <label>Is Featured:
                <input type='checkbox' id={props.action + "IsFeatured"} name="isFeatured" checked={project.isFeatured}
                    onChange={(e) => {
                        const { name, checked } = e.target;
                        setProject({
                            ...project,
                            [name]: checked,
                        });
                    }} /></label>


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