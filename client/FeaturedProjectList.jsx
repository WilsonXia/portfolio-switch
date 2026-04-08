const helper = require('./helper.js');
const React = require('react');
const { useState, useEffect } = React;

const {FeaturedProjectTile} = require('./FeaturedProjectTile.jsx');

const FeaturedProjectList = (props) => {
    const [projects, setProjects] = useState(props.projects);

    useEffect(() => {
        const loadProjectsFromServer = async () => {
            const response = await fetch('/getProjects');
            const data = await response.json();
            // Filters
            if (props.filters && props.filters.length > 0) {
                let filteredData = data.projects;
                // Filter for each filter inside the props.filters
                for (let filterMethod of props.filters) {
                    filteredData = filteredData.filter(filterMethod);
                }
                setProjects(filteredData);
            }
            else {
                setProjects(data.projects);
            }
        };
        loadProjectsFromServer();
    }, [props.reloadProjectState]); // Dependency, will trigger effect on change

    if (projects != null && projects.length === 0) {
        return (
            <div className='projectList'>
                <div className='tile'></div>
            </div>
        );
    }

    const projectNodes = projects.map((project, i) => {
        return (
            <FeaturedProjectTile project={project}
                index={i}
                reloadProjectState={props.reloadProjectState}
                triggerReload={props.triggerReload} />
        );
    });

    return (
        <div id="featuredList">
            <div id='projects' className='container'>
                {projectNodes}
            </div>
            <h2 id="featureLabel" className='title is-3'>Featured Projects!</h2>
        </div>
    );
}

module.exports = { FeaturedProjectList };