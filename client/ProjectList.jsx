const helper = require('./helper.js');
const React = require('react');
const { useState, useEffect } = React;
const { ProjectTile } = require('./ProjectTile.jsx');

const ProjectList = (props) => {
    const [projects, setProjects] = useState(props.projects);

    useEffect(() => {
        const loadProjectsFromServer = async () => {
            const response = await fetch('/getProjects');
            const data = await response.json();
            // Filters
            if(props.filters && props.filters.length > 0){
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
        return (
            <ProjectTile project={project}
            editable={props.editable} 
            reloadProjectState={props.reloadProjectState}
            triggerReload={props.triggerReload}/>
        );
    });

    return (
        <div className='projectList container'>
            {projectNodes}
        </div>
    );
}

module.exports = {ProjectList};