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
            // Filters
            if(props.filters){
                console.log(data.projects);
                let filteredData = data.projects;
                // Filter for each filter inside the props.filters
                for (let filterMethod of props.filters){
                    filteredData.filter(filterMethod);
                }
                setProjects(filteredData);
            }
            else{
                setProjects(data.projects);
            }
        };
        loadProjectsFromServer();
    }, [props.reloadProjectState]); // Dependency, will trigger effect on change

    if (projects != null && projects.length === 0) {
        return (
            <div className='projectList'>
                <h3 className='emptyList'>No Projects Yet!</h3>
            </div>
        );
    }

    const projectNodes = projects.map(project => {
        // Refactor this into a ProjectTile Component + an EditProjectTile Component
        return (
            <div key={project._id} className='projectTile'>
                <img src="/assets/img/domoface.jpeg" alt="domo face" className='domoFace' />
                <h3 className='label'>{project.name}</h3>
                <h3>{project.tags}</h3>
                <h3 className='label'>Web:{project.externalLink}</h3>
                <h3 className='label'>Git:{project.githubLink}</h3>
                <h3 className='label'>Is Featured: {project.isFeatured ? "yes" : "no"}</h3>
                <img src={project.images[0]} alt="coverArt" className='coverArt'/>
                <div>
                    <ProjectForm action={"update"} projectID={project._id} 
                    reloadProjectState={props.reloadProjectState} triggerReload={props.triggerReload} />
                    {/* <ProjectForm projectType={project._id} triggerReload={props.triggerReload} /> */}
                </div>
            </div>
        );
    });

    return (
        <div className='projectList'>
            {projectNodes}
        </div>
    );
}

module.exports = {ProjectList};