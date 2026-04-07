const helper = require('./helper.js');
const React = require('react');
const { useState, useEffect } = React;
const { ProjectTile } = require('./ProjectTile.jsx');
const Carousel = require('react-multi-carousel').default;
require('react-multi-carousel/lib/styles.css');

const ProjectList = (props) => {
    const [projects, setProjects] = useState(props.projects);

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3.8,
            // slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3,
            // slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 3,
        }
    };

    useEffect(() => {
        const loadProjectsFromServer = async () => {
            const response = await fetch('/getProjects');
            const data = await response.json();
            // Filters
            if (props.filters && props.filters.length > 0) {
                let filteredData = data.projects;
                // Filter for each filter inside the props.filters
                for (let filterMethod of props.filters) {
                    filteredData.filter(filterMethod);
                }
                setProjects(filteredData);
            }
            else {
                setProjects(data.projects);
            }
        };
        loadProjectsFromServer();
    }, [props.reloadProjectState]); // Dependency, will trigger effect on change

    if (projects != null && projects.length === 0) {
        return (
            <div className='projectList'>
                <div className='tile'></div>
            </div>
        );
    }

    const projectNodes = projects.map((project, i) => {
        return (
            <ProjectTile project={project}
                index={i}
                editable={props.editable}
                reloadProjectState={props.reloadProjectState}
                triggerReload={props.triggerReload} />
        );
    });

    return (
        <Carousel
            responsive={responsive}
            arrows={false}
            // draggable={false}
            containerClass='projectList'
            itemClass='centerItems'
        >
            {/* Manual offset for the carousel */}
            {/* <div className='tile'></div> */}
            {projectNodes}
            {props.editable ? <></> :
                <a id="loginButton" href="/login" onClick={
                    (e) => {
                        e.preventDefault();
                        document.getElementById('loginPopup').classList.toggle('hidden');
                        return false;
                    }
                }>
                    <h2 className='subtitle'>Edit Projects</h2>
                </a>
            }
        </Carousel>
    );
}

module.exports = { ProjectList };