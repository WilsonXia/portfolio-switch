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

    const CoverArt = () => {
        return (
            <div alt="coverArt" id='popupCover'>
                <span className="icon is-medium m-3">
                    <img id='popupFeatured' src="/assets/img/star-empty.svg" alt="is featured" />
                </span>
            </div>
        );
    }

    const CloseButton = () => {
        return (
            <div id='popupClose'>
                <button className='closeButton' onClick={closePopup}>
                    <span class="icon is-large">
                        <img src="/assets/img/xmark.svg" alt="exit button" />
                    </span>
                </button>
            </div>
        );
    }

    return (
        <div id='projectPopup' className='hidden popup'>
            <div className='back-bar'>
                <section className='popupProject'>
                    <CoverArt />
                    <div className='popupContent'>
                        <div className='labels'>
                            <h2 id='popupName' className='title'></h2>
                            <h3 id='popupTags' className='subtitle'></h3>
                        </div>
                        <div className='buttonControl'>
                            <a id='popupLink' target='_blank' className='button'>Visit Website</a>
                            <a id='popupGithub' target='_blank' className='button'>Github</a>
                        </div>
                    </div>
                </section>
                <CloseButton />
            </div>
        </div>
    );
}

module.exports = { ProjectInfoPopup };
