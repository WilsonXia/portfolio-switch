const helper = require('./helper.js');
const React = require('react');
const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');
const { ProjectForm } = require('./ProjectForm.jsx');
const { ProjectList } = require('./ProjectList.jsx');

const App = () => {
    const [reloadProjects, setReloadProjects] = useState(false);

    return (
        <div>
            <div id='makeDomo'>
                <ProjectForm triggerReload={() => setReloadProjects(!reloadProjects)} />
            </div>
            <div id='domos'>
                <ProjectList projects={[]} reloadDomos={reloadProjects} triggerReload={() => setReloadProjects(!reloadProjects)} />
            </div>
        </div>
    );
}

const init = () => {
    const root = createRoot(document.getElementById('app'));
    root.render(<App />);
}

window.onload = init;