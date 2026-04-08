const helper = require('../helper.js');
const React = require('react');
const { useState } = React;
const { createRoot } = require('react-dom/client');
const { ProjectForm } = require('../ProjectForm.jsx');
const { ProjectList } = require('../ProjectList.jsx');

const handleDelete = (e) => {
    e.preventDefault();
    const projectID = document.getElementById("deleteID").value;
    // console.log(`We are going to delete ${projectID}`);
    const handler = (res) => {
        // console.log(res);
        document.getElementById('deletePopup').classList.add('hidden');
        window.location = '/creator';
    };
    helper.sendDelete(`/delete?projectID=${projectID}`, handler);
    return false;
}

const DeleteWindow = () => {
    return (
        <div id='deletePopup' className='hidden popup'>
            <div className='container'>
                <div id="deleteForm">
                    <h2 className='title has-text-centered'>Warning</h2>
                    <h3 className='subtitle p-2' id="deleteMessage">Delete project from the database?</h3>
                    <input id='deleteID' className='hidden' type="text" />
                    <div class="field is-grouped is-grouped-centered">
                        <div className="control">
                            <button className='button has-background-danger'
                                onClick={handleDelete}>
                                Delete
                            </button>
                        </div>
                        <div id='popupClose' className='control'>
                            <button className='button'
                                onClick={
                                    (e) => {
                                        e.preventDefault();
                                        document.getElementById('deletePopup').classList.add('hidden');
                                        return false;
                                    }
                                }>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const Creator = () => {
    const [reloadProjects, setReloadProjects] = useState(false);

    return (
        <>
            <DeleteWindow />
            <div className='tools'>
                <div className="centeringBox">
                    <ProjectForm action={"create"} triggerReload={() => setReloadProjects(!reloadProjects)} />
                </div>
                <ProjectList projects={[]}
                    editable={true}
                    reloadProjectState={reloadProjects}
                    triggerReload={() => setReloadProjects(!reloadProjects)} />
            </div>
        </>
    );
}

const init = () => {
    const root = createRoot(document.getElementById('creator'));
    root.render(<Creator />);

    helper.displayCurrentTime();
    setInterval(helper.displayCurrentTime, 1000);
}

window.onload = init;