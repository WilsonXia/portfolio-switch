const helper = require('./helper.js');
const React = require('react');
const { useState, useEffect } = React;

const ProjectInfoPopup = (props) => {
    // const [project, setProject] = useState(props.project);

    // if (!project || !project.name) {
    //     return (<></>);
    // }

    const closePopup = () => {
        // Closes this popup
        document.getElementById('projectPopup').classList.toggle('hidden');
    }

    return (
        <div id='projectPopup' className='hidden container'>
            <div className='container'>
                <img alt="coverArt" id='popupCover' />
            </div>
            <div className='container'>
                <h3 id='popupName' className='label'></h3>
                <h3 id='popupTags'></h3>
                <h3 id='popupFeatured' className='label'>Featured Project</h3>
                <a id='popupLink' className='button'>Visit Website</a>
                <a id='popupGithub' className='button'>Github</a>
                <button className='button' onClick={closePopup}>Close</button>
            </div>
        </div>
        // <div className='hidden container'>
        //     <div className='container'>
        //         <img src={project.images[0]} alt="coverArt" id='popupCover' />
        //     </div>
        //     <div className='container'>
        //         <h3 id='popupName' className='label'>{project.name}</h3>
        //         <h3 id='popupTags'>{project.tags}</h3>
        //         {project.isFeatured ?
        //             <h3 id='popupFeatured' className='label'>Featured Project</h3> :
        //             <></>}
        //         <a id='popupLink' className='button' href={project.externalLink}>Visit Website</a>
        //         <a id='popupGithub' className='button' href={project.githubLink}>Github</a>
        //         <button className='button'>Close</button>
        //     </div>
        // </div>
    );
}

module.exports = { ProjectInfoPopup };
