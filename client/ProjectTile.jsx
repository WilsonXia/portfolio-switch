const helper = require('./helper.js');
const React = require('react');
const { useState, useEffect } = React;
const { ProjectForm } = require('./ProjectForm.jsx');


const showProjectLabel = (e) => {
    hideProjectLabel();
    e.currentTarget.querySelector("h2").classList.remove('hidden');
    e.currentTarget.classList.add('tileHover');
}

const hideProjectLabel = () => {
    const tiles = document.getElementsByClassName("projectTile");
    const tileLabels = document.getElementsByClassName("tileLabel");
    [...tileLabels].forEach(label => {
        label.classList.add('hidden');
    });
    [...tiles].forEach(tile => {
        tile.classList.remove('tileHover');
    })
    // e.currentTarget.querySelector("h2").classList.add('hidden');
}

// Props include
// project
// editable
// triggerReload
// reloadProjectState
const ProjectTile = (props) => {
    const [project, setProject] = useState(props.project);
    const mousePos = { x: 0, y: 0 }
    const dragThreshold = 10;

    const trackMouse = (e) => {
        // Track mouse pos
        mousePos.x = e.screenX;
        mousePos.y = e.screenY;
    }

    const checkForClick = (e) => {
        // Calculate distance dragged to see
        // if user tried to drag vs click
        if (Math.abs(e.screenX - mousePos.x) < dragThreshold &&
            Math.abs(e.screenY - mousePos.y) < dragThreshold) {
            helper.handleProjectSelect(project);
            e.currentTarget.querySelector("h2").classList.remove('hidden');
        }
    }

    return (
        <div key={project._id} className='projectTile'
            onMouseEnter={showProjectLabel}
            // onMouseLeave={hideProjectLabel}
            onMouseUp={checkForClick}
            onMouseDown={trackMouse}
            style={{
                backgroundImage: `url(${project.images[0]})`,
            }}>
            <h2 className='title is-9 tileLabel hidden'>{project.name}</h2>
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