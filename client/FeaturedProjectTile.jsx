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
        <a target='_blank'
            href={project.externalLink ? project.externalLink : project.githubLink}
            key={project._id} id={`project${props.index}`}
            className='projectTile featuredTile'
            style={{
                backgroundImage: `url(${project.images[0]})`,
            }}>
            <h3 className='subtitle bottomLabel'>{project.name}</h3>
        </a>
    );
}

module.exports = { FeaturedProjectTile };