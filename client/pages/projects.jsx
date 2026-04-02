const helper = require('../helper.js');
const React = require('react');
const { useState } = React;
const { createRoot } = require('react-dom/client');

const { ProjectDisplay } = require('../ProjectDisplay.jsx');
const { TextInput } = require('../TextInput.jsx');
const { ContactBar } = require('../ContactBar.jsx');

const handleLogin = (e, formData) => {
    // Prevent Default
    e.preventDefault();
    helper.hideError();

    const { username, pass } = formData;
    // const pass = e.target.querySelector('#pass').value;

    if (!username || !pass) {
        // Handle Error
        helper.handleError('Username or password is empty!');
        return false;
    }

    helper.sendPost(e.target.action, { username, pass });
    return false;
}

const LoginWindow = (props) => {
    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("");
    return (
        <div id='loginPopup' className='hidden popup'>
            <div className='container'>
                <form id="loginForm"
                    name="loginForm"
                    onSubmit={e => handleLogin(e, { username, pass })}
                    action="/login"
                    method="POST"
                >
                    <TextInput inputName={"Username"} placeholder={""} value={username}
                        action={props.action} onChange={(e) => { setUsername(e.target.value) }} />
                    <TextInput inputName={"Password"} placeholder={""} value={pass} usePass={true}
                        action={props.action} onChange={(e) => { setPass(e.target.value) }} />

                    <div class="field is-grouped is-grouped-centered">
                        <div className="control">
                            <input className='submit button' type='submit' value="Sign In" />
                        </div>
                        <div id='popupClose' className='control'>
                            <button className='button'
                                onClick={
                                    (e) => {
                                        e.preventDefault();
                                        document.getElementById('loginPopup').classList.toggle('hidden')
                                        return false;
                                    }
                                }>Close</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

const Home = () => {
    return (
        <>
            <LoginWindow />
            <div
                className='is-flex is-flex-direction-column'>
                <ProjectDisplay />
                <ContactBar />
            </div>
        </>
    );

}

const init = () => {
    const homeNav = document.getElementById('homeNav');
    const homeLabel = document.getElementById('homeLabel');

    // const signupButton = document.getElementById('signupButton');
    // const burger = document.getElementById('burger');

    const root = createRoot(document.getElementById('projectViewer'));
    root.render(<Home />);

    
    // Add events after rendering
    homeNav.addEventListener('mouseenter', () => {
        homeLabel.classList.remove('hidden');
    });
    homeNav.addEventListener('mouseleave', () => {
        homeLabel.classList.add('hidden');
    });

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