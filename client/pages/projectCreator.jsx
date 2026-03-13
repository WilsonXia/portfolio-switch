const React = require('react');
const { useState } = React;
const { createRoot } = require('react-dom/client');
const { ProjectForm } = require('../ProjectForm.jsx');
const { ProjectList } = require('../ProjectList.jsx');

const Creator = () => {
    const [reloadProjects, setReloadProjects] = useState(false);

    return (
        <div className='tools'>
            <ProjectForm action={"create"} triggerReload={() => setReloadProjects(!reloadProjects)} />
            <ProjectList projects={[]} 
                editable={true} 
                reloadProjectState={reloadProjects} 
                triggerReload={() => setReloadProjects(!reloadProjects)} />
        </div>
    );
}

const init = () => {
    const root = createRoot(document.getElementById('creator'));
    root.render(<Creator />);
}

window.onload = init;