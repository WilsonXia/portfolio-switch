const helper = require('./helper.js');
const React = require('react');
const { useState, useEffect } = React;
const { ProjectForm } = require('./ProjectForm.jsx');

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
            <div key={project.id} className='project'>
                <img src="/assets/img/domoface.jpeg" alt="domo face" className='domoFace' />
                <h3 className='domoName'>{project.name}</h3>
                <h3>{project.tags}</h3>
                <h3 className='domoName'>Web:{project.externalLink}</h3>
                <h3 className='domoName'>Git:{project.githubLink}</h3>
                <h3>Is Featured: {project.isFeatured}</h3>
                <img src={project.images[0]} alt="coverArt" className='coverArt'/>
                <div>
                    <ProjectForm action={"update"} projectType={project._id} triggerReload={props.triggerReload} />
                    {/* <ProjectForm projectType={project._id} triggerReload={props.triggerReload} /> */}
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

module.exports = {ProjectList};