const helper = require('./helper.js');
const React = require('react');
const { useState, useEffect } = React;
const { ProjectForm } = require('./ProjectForm.jsx');

// Props include
// project
// editable
// triggerReload
// reloadProjectState
const ProjectTile = (props) => {
    const [project, setProject] = useState(props.project);
    const mousePos = {x: 0, y:0}
    const dragThreshold = 10;

    // TODO: make onMouseEnter switch on a small header of the project name
    //          to display to the user
    return (
        <div key={project._id} className='projectTile'
            onMouseEnter={
                () => {
                    console.log(`${project.name} should highlight`);
                }
            }
            onMouseUp={
                (e) => {
                    if(Math.abs(e.screenX - mousePos.x) < dragThreshold && 
                    Math.abs(e.screenY - mousePos.y) < dragThreshold){
                        helper.handleProjectSelect(project);
                    }
                }
            }
            onMouseDown={
                (e) => {
                    mousePos.x = e.screenX;
                    mousePos.y = e.screenY;
                    console.log(mousePos);
                }
            }
            style={{
                backgroundImage: `url(${project.images[0]})`,
                backgroundSize: "cover",
            }}>
            {/* <h3 className='label'>{project.name}</h3>
            <h3>{project.tags}</h3>
            <h3 className='label'>Web:{project.externalLink}</h3>
            <h3 className='label'>Git:{project.githubLink}</h3>
            <h3 className='label'>Is Featured: {project.isFeatured ? "yes" : "no"}</h3> */}
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