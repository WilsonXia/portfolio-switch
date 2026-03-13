const helper = require('../helper.js');
const React = require('react');
const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');
const { ProjectForm } = require('../ProjectForm.jsx');
const { ProjectList } = require('../ProjectList.jsx');

const Creator = () => {
    const [reloadProjects, setReloadProjects] = useState(false);

    return (
        <div>
            <div id='makeDomo'>
                <ProjectForm action={"create"} triggerReload={() => setReloadProjects(!reloadProjects)} />
            </div>
            <div id='domos'>
                <ProjectList projects={[]} 
                editable={true} 
                reloadProjectState={reloadProjects} 
                triggerReload={() => setReloadProjects(!reloadProjects)} />
            </div>
        </div>
    );
}

const init = () => {
    const root = createRoot(document.getElementById('creator'));
    root.render(<Creator />);
}

window.onload = init;