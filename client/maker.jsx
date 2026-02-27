const helper = require('./helper.js');
const React = require('react');
const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');

const handleCreateProject = (e, onProjectAdded) => {
    e.preventDefault();
    helper.hideError();

    const name = e.target.querySelector('#projectName').value;
    const engineType = e.target.querySelector('#projectEngineType').value;
    const projectType = e.target.querySelector('#projectType').value;
    const externalLink = e.target.querySelector('#projectExternalLink').value;
    const githubLink = e.target.querySelector('#projectGithubLink').value;
    const imageURL = e.target.querySelector('#projectImageURL').value;
    if (!name || !engineType || projectType) {
        helper.handleError('Name, Engine type, and Project Type are required');
        return false;
    }

    if (!externalLink || !githubLink) {
        helper.handleError('A link is required');
        return false;
    }

    helper.sendPost(e.target.action, { name, engineType, projectType, externalLink, githubLink, imageURL }, onProjectAdded);
    return false;
}

const handleUpdateProject = (e, id, onDomoAdded) => {
    e.preventDefault();
    helper.hideError();

    const greeting = e.target.querySelector('#domoGreeting').value;
    const domoID = id;

    if (!greeting) {
        helper.handleError('A greeting is required');
        return false;
    }

    helper.sendPost(e.target.action, { domoID, greeting }, onDomoAdded);
    return false;
}

const ProjectForm = (props) => {
    return (
        <form id="projectForm"
            onSubmit={(e) => handleCreateProject(e, props.triggerReload)}
            name="projectForm"
            action="/creator"
            method="POST"
            className="projectForm"
        >
            <label htmlFor="name">Name: </label>
            <input type="text" id="projectName" name="name" placeholder="Name" />
            <label htmlFor="engineType">Engine Type: </label>
            <input type="text" id="projectEngineType" name="engineType" placeholder="Engine Type" />
            <label htmlFor="projectType">Project Type: </label>
            <input type="text" id="projectType" name="projectType" placeholder="Project Type" />
            <label htmlFor="externalLink">Link to Project: </label>
            <input type="text" id="projectExternalLink" name="externalLink" placeholder="Link" />
            <label htmlFor="githubLink">Link to Github: </label>
            <input type="text" id="projectGithubLink" name="githubLink" placeholder="Link" />
            <label htmlFor="imageURL">Image URL: </label>
            <input type="text" id="projectImageURL" name="imageURL" placeholder="Image Link" />

            <input className='projectSubmit' type='submit' value="Create Project" />
        </form>
    )
}

// Make something that allows you to edit pre-existing domos
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
            <label htmlFor="engineType">Engine Type: </label>
            <input type="text" id="projectEngineType" name="engineType" placeholder="Engine Type" />
            <label htmlFor="projectType">Project Type: </label>
            <input type="text" id="projectType" name="projectType" placeholder="Project Type" />
            <label htmlFor="externalLink">Link to Project: </label>
            <input type="text" id="projectExternalLink" name="externalLink" placeholder="Link" />
            <label htmlFor="githubLink">Link to Github: </label>
            <input type="text" id="projectGithubLink" name="githubLink" placeholder="Link" />
            <label htmlFor="imageURL">Image URL: </label>
            <input type="text" id="projectImageURL" name="imageURL" placeholder="Image Link" />
            <input type='submit' value="Submit" />
        </form>
    );
}

const ProjectList = (props) => {
    const [projects, setProjects] = useState(props.projects);

    useEffect(() => {
        const loadProjectsFromServer = async () => {
            const response = await fetch('/getProjects');
            const data = await response.json();
            setProjects(data.projects);
        };
        loadProjectsFromServer();
    }, [props.reloadProjects]); // Dependency, will trigger effect on change

    if (projects != null && projects.length === 0) {
        return (
            <div className='domoList'>
                <h3 className='emptyDomos'>No Projects Yet!</h3>
            </div>
        );
    }

    const projectNodes = projects.map(project => {
        return (
            <div key={project.id} className='domo'>
                <img src="/assets/img/domoface.jpeg" alt="domo face" className='domoFace' />
                <h3 className='domoName'>Name: {project.name}</h3>
                <h3 className='domoAge'>Engine Type: {project.engineType}</h3>
                <h3 className='domoName'>{project.projectType}</h3>
                <h3 className='domoName'>{project.externalLink}</h3>
                <h3 className='domoName'>{project.githubLink}</h3>
                <h3 className='domoName'>{project.imagURL}</h3>
                <div>
                    <UpdateProjectForm projectType={project._id} triggerReload={props.triggerReload} />
                </div>
            </div>
        );
    });

    return (
        <div className='domoList'>
            {projectNodes}
        </div>
    );
}

const App = () => {
    const [reloadProjects, setReloadProjects] = useState(false);

    return (
        <div>
            <div id='makeDomo'>
                <ProjectForm triggerReload={() => setReloadProjects(!reloadProjects)} />
            </div>
            <div id='domos'>
                <ProjectList projects={[]} reloadDomos={reloadProjects} triggerReload={() => setReloadProjects(!reloadProjects)} />
            </div>
        </div>
    );
}

const init = () => {
    const root = createRoot(document.getElementById('app'));
    root.render(<App />);
}

window.onload = init;