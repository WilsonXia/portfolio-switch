const helper = require('./helper.js');
const React = require('react');
const { useState, useEffect } = React;
const { ProjectForm } = require('./ProjectForm.jsx');

const ProjectInfoPopup = (props) => {
    const [project, setProject] = useState(props.project);

    return (
        <div className='hidden container'>
            <div className='container'>
                <img src={project.images[0]} alt="coverArt" className='coverArt' />
            </div>
            <div className='container'>
                <h3 className='label'>{project.name}</h3>
                <h3>{project.tags}</h3>
                <h3 className='label'>Visit Website{project.externalLink}</h3>
                <h3 className='label'>Github{project.githubLink}</h3>
                <h3 className='label'>Is Featured: {project.isFeatured ? "yes" : "no"}</h3>
            </div>

        </div>
    );
}

// Props include
// project
// editable
// triggerReload
// reloadProjectState
const ProjectTile = (props) => {
    const [project, setProject] = useState(props.project);

    return (
        <div key={project._id} className='projectTile'
            style={{
                backgroundImage: `url(${project.images[0]})`,
                backgroundSize: "cover",
            }}>
            <h3 className='label'>{project.name}</h3>
            <h3>{project.tags}</h3>
            <h3 className='label'>Web:{project.externalLink}</h3>
            <h3 className='label'>Git:{project.githubLink}</h3>
            <h3 className='label'>Is Featured: {project.isFeatured ? "yes" : "no"}</h3>
            {/* <img src={project.images[0]} alt="coverArt" className='coverArt' /> */}
            {
                props.editable ?
                    <div>
                        <ProjectForm action={"update"} projectID={project._id}
                            reloadProjectState={props.reloadProjectState} triggerReload={props.triggerReload} />
                    </div> : <></>
            }
        </div>
    );
}

module.exports = { ProjectTile };