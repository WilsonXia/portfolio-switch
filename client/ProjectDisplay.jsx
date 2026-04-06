const helper = require('./helper.js');
const React = require('react');
const { useState } = React;

const { ProjectList } = require('./ProjectList.jsx');
const { ProjectInfoPopup } = require('./ProjectInfoPopup.jsx');

const ProjectDisplay = (props) => {
    const [reloadProjects, setReloadProjects] = useState(false);

    const featuredFilter = (project) => {
        console.log(project.isFeatured);
        return project.isFeatured;
    };

    return (<>
        <ProjectList
            projects={[]}
            filters={props.featured ? [featuredFilter] : []}
            reloadProjectState={reloadProjects}
            triggerReload={() => setReloadProjects(!reloadProjects)} />
        <ProjectInfoPopup/>
    </>
    );
}

module.exports = {ProjectDisplay}