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
        <div id='projectPopup' className='hidden popup'>
            <div className='back-bar'>
                <div>
                    <div alt="coverArt" id='popupCover'>
                        <h3 id='popupFeatured'></h3>
                    </div>
                </div>
                <section className='popupContent'>
                    <div className='labels'>
                        <h2 id='popupName' className='title'></h2>
                        <h3 id='popupTags' className='subtitle'></h3>
                    </div>
                    <div className='buttonControl'>
                        <a id='popupLink' className='button'>Visit Website</a>
                        <a id='popupGithub' className='button'>Github</a>
                    </div>
                </section>
                <div id='popupClose'>
                    <button  className='button' onClick={closePopup}>Close</button>
                </div>
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
