const helper = require('./helper.js');
const React = require('react');
const { useState, useEffect } = React;
const { TextInput } = require('./TextInput.jsx');
const { ProjectTagSelector } = require('./ProjectTagSelector.jsx');


const checkData = (formData, props) => {
    // Destructure Form to
    // Check if required form data is submitted
    // return true;
    const { name, externalLink, githubLink } = helper.convertFormData(formData);
    // Checks
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
    return true
}

const handleCreateProject = (e, props, onProjectAdded) => {
    e.preventDefault();
    helper.hideError();

    const formData = new FormData(e.target);
    formData.append("tags", props.tags);

    if (checkData(formData, props)) {
        // Data has passed checks
        // allow fetch
        helper.sendPostFile(e.target.action, formData, onProjectAdded);
    }
    return false;
}

const handleUpdateProject = (e, props, onProjectChanged) => {
    e.preventDefault();
    helper.hideError();

    const formData = new FormData(e.target);
    formData.append("tags", props.tags);
    formData.append("projectID", props.projectID);

    console.log(props.tags);
    

    if (checkData(formData, props)) {
        helper.sendPostFile(e.target.action, formData, onProjectChanged);
    }
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
    const [tags, setTags] = useState([]);
    const [images, setImages] = useState([]);

    // Handlers
    const handleTextChange = (e) => {
        // Access the htmlElement's attributes
        // Use those to update the project
        const { name, value } = e.target;
        setProject({
            ...project,
            [name]: value
        });
    }
    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setProject({
            ...project,
            [name]: checked,
        });
    }
    const handleImageUpload = (e) => setImages(e.target.files)
    const formChanges = {
        handler: props.action === "create" ?
            (e) => handleCreateProject(e, { tags, images }, props.triggerReload)
            : (e) => handleUpdateProject(e, { tags, images, projectID: props.projectID }, props.triggerReload),
        submit: props.action === "create" ? "Create" : "Submit"
    };

    // Use Effect
    useEffect(() => {
        const loadProjectFromServer = async () => {
            // const qParams = {projectID: props.projectID};
            console.log("data loading...");
            const response = await fetch(`/getProject?projectID=${props.projectID}`, {
                method: 'GET',
            });
            const data = await response.json();

            setProject(data.project);
            setTags(data.project.tags.filter(Boolean));
        };
        // Read project data if it exists
        if (props.projectID) {
            loadProjectFromServer();
        }
    }, [props.reloadProjectState]); // Dependency, will trigger effect on change

    return (
        <form id={props.action + "Form"}
            onSubmit={(e) => formChanges.handler(e)}
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
                <input className='star' type='checkbox' name="isFeatured" checked={project.isFeatured}
                    onChange={handleCheckboxChange} /></label>

            <label>Upload Images: </label>
            <input
                type="file"
                multiple accept=".png, .jpg"
                name='imageFile'
                onChange={handleImageUpload}
            />
            <input className='submit button' type='submit' value={formChanges.submit} />
        </form>)
}

module.exports = { ProjectForm };