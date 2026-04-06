const helper = require('./helper.js');
const React = require('react');
const { useState, useEffect } = React;

// Props include
// project
// editable
// triggerReload
// reloadProjectState
const FeaturedProjectTile = (props) => {
    const [project, setProject] = useState(props.project);

    return (
        <div key={project._id} id={`project${props.index}`}
            className='projectTile featuredTile'
            style={{
                backgroundImage: `url(${project.images[0]})`,
            }}>
            <h2 className='title tileLabel hidden'>{project.name}</h2>
        </div>
    );
}

module.exports = { FeaturedProjectTile };