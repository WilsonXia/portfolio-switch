const helper = require('../helper.js');
const React = require('react');
const { useState } = React;
const { createRoot } = require('react-dom/client');

const { FeaturedProjectList } = require('../FeaturedProjectList.jsx');

// const handleSignup = (e) => {
//     e.preventDefault();
//     helper.hideError();

//     const username = e.target.querySelector('#user').value;
//     const pass = e.target.querySelector('#pass').value;
//     const pass2 = e.target.querySelector('#pass2').value;

//     if (!username || !pass || !pass2) {
//         helper.handleError('All fields are required!');
//         return false;
//     }

//     if (pass !== pass2) {
//         helper.handleError('Passwords do not match!');
//         return false;
//     }

//     helper.sendPost(e.target.action, { username, pass, pass2 });
//     return false;
// }


// const SignupWindow = (props) => {
//     return (
//         <form id="signupForm"
//             name="signupForm"
//             onSubmit={handleSignup}
//             action="/signup"
//             method="POST"
//             className="mainForm"
//         >
//             <label htmlFor="username">Username: </label>
//             <input type="text" id="user" name="username" placeholder="username" />
//             <label htmlFor="pass">Password: </label>
//             <input type="password" id="pass" name='pass' placeholder='password' />
//             <label htmlFor="pass">Password: </label>
//             <input type="password" id="pass2" name='pass2' placeholder='retype password' />
//             <input className='formSubmit' type='submit' value="Sign In" />
//         </form>
//     )
// }

const AboutMePanel = () => {
    return (
        <section id="aboutMe" className='column'>
            <div id='description'>
                <h1 className="title is-1">Wilson Xia</h1>
                <h2 className="subtitle">Your Future Dev Partner</h2>
            </div>

            <a className="projectsButton" href="/projects">
                <span className="icon is-large">
                    <img src="/assets/img/project.svg" alt="projects icon" />
                </span>
                <h2 id="projectsLabel" className="navLabel">Enter</h2>
            </a>
        </section>
    );
}

const Home = () => {
    const [reloadProjects, setReloadProjects] = useState(false);

    const featuredFilter = (project) => {
        console.log(project.isFeatured);
        return project.isFeatured;
    };
    return (
        <div id='homeMain'>
            <FeaturedProjectList
                projects={[]}
                filters={[featuredFilter]}
                reloadProjectState={reloadProjects}
                triggerReload={() => setReloadProjects(!reloadProjects)}
            />
            <AboutMePanel />
        </div>
    );
}

const init = () => {
    // const signupButton = document.getElementById('signupButton');
    // const burger = document.getElementById('burger');

    const root = createRoot(document.getElementById('content'));
    root.render(<Home />);

    // burger.addEventListener('click', (e) => {
    //     e.preventDefault();
    //     helper.toggleBurger();
    //     return false;
    // });

    // signupButton.addEventListener('click', (e) => {
    //     e.preventDefault();
    //     // root.render(<ProjectDisplay />);
    //     return false;
    // });

    helper.displayCurrentTime();
    setInterval(helper.displayCurrentTime, 1000);
}

window.onload = () => {
    init();
};