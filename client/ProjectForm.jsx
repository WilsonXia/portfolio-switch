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

    if (!externalLink && !githubLink) {
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

const promptConfirmation = (e, project) => {
    e.preventDefault();
    document.getElementById('deletePopup').classList.toggle('hidden');
    document.getElementById('deleteID').value = project._id;
    document.getElementById('deleteMessage').innerHTML = `Delete ${project.name} from the database?`;
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

    const IsFeaturedCB = () => {
        return (
            <label className='label'>Is Featured
                <div className="control">
                    <input className='star' type='checkbox' name="isFeatured" checked={project.isFeatured}
                        onChange={handleCheckboxChange} />
                </div>
            </label>
        );
    }

    const ImageUploader = () => {
        return (
            <div class="file has-name is-boxed">
                <label class="file-label label">
                    <input class="file-input"
                        type="file"
                        multiple accept=".png, .jpg"
                        name='imageFile'
                        onChange={handleImageUpload}
                    />
                    <span class="file-cta">
                        <span class="icon">
                            <img src="/assets/img/upload.svg" alt="upload icon"/>
                        </span>
                        <span class="file-label"> Upload an image... </span>
                    </span>
                    <span class="file-name"></span>
                </label>
            </div>
        );
        {/* <div className="field">
                <label className='label'>Upload Images: </label>
                <input
                    type="file"
                    multiple accept=".png, .jpg"
                    name='imageFile'
                    onChange={handleImageUpload}
                />
            </div> */}
    }

    return (
        <form id={props.action + "Form"}
            onSubmit={(e) => formChanges.handler(e)}
            action={"/" + props.action}
            method="POST"
            encType="multipart/form-data"
            className={props.action + "Form"}
        >
            {props.action === "create" ? <h2 className='title'>Create New Project</h2> : <></>}

            <TextInput inputName={"Name"} placeholder={"Enter a name..."} value={project.name}
                action={props.action} onChange={handleTextChange} />

            <ProjectTagSelector selected={tags} setSelected={setTags} />

            <TextInput inputName={"External Link"} placeholder={"Link"} value={project.externalLink}
                action={props.action} onChange={handleTextChange} />

            <TextInput inputName={"Github Link"} placeholder={"Link"} value={project.githubLink}
                action={props.action} onChange={handleTextChange} />
            <div className="field">
                <ImageUploader />
            </div>
            <div className="field">
                <IsFeaturedCB />
            </div>
            <div className='field is-grouped is-grouped-right'>
                {props.action === "update" ? 
                <button className='button has-background-danger'
                onClick={(e)=>{promptConfirmation(e, project)}}
                >
                    Delete</button>
                : <></>}
                <input className='submit button' type='submit' value={formChanges.submit} />
            </div>
        </form>)
}

module.exports = { ProjectForm };