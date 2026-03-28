const helper = require('../helper.js');
const React = require('react');
const { useState } = React;
const { createRoot } = require('react-dom/client');

const { ProjectDisplay } = require('../ProjectDisplay.jsx');
const { TextInput } = require('../TextInput.jsx');

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

const handleSignup = (e) => {
    e.preventDefault();
    helper.hideError();

    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;
    const pass2 = e.target.querySelector('#pass2').value;

    if (!username || !pass || !pass2) {
        helper.handleError('All fields are required!');
        return false;
    }

    if (pass !== pass2) {
        helper.handleError('Passwords do not match!');
        return false;
    }

    helper.sendPost(e.target.action, { username, pass, pass2 });
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
const SignupWindow = (props) => {
    return (
        <form id="signupForm"
            name="signupForm"
            onSubmit={handleSignup}
            action="/signup"
            method="POST"
            className="mainForm"
        >
            <label htmlFor="username">Username: </label>
            <input type="text" id="user" name="username" placeholder="username" />
            <label htmlFor="pass">Password: </label>
            <input type="password" id="pass" name='pass' placeholder='password' />
            <label htmlFor="pass">Password: </label>
            <input type="password" id="pass2" name='pass2' placeholder='retype password' />
            <input className='formSubmit' type='submit' value="Sign In" />
        </form>
    )
}

const Home = () => {
    return (
        <>
            <LoginWindow />
            <ProjectDisplay />
        </>
    );

}

const init = () => {
    const loginButton = document.getElementById('loginButton');
    const signupButton = document.getElementById('signupButton');
    const burger = document.getElementById('burger');

    const root = createRoot(document.getElementById('content'));
    root.render(<Home />);

    burger.addEventListener('click', (e) => {
        e.preventDefault();
        helper.toggleBurger();
        return false;
    });

    loginButton.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('loginPopup').classList.toggle('hidden');
        return false;
    });

    signupButton.addEventListener('click', (e) => {
        e.preventDefault();
        // root.render(<ProjectDisplay />);
        return false;
    });
}

window.onload = () => {
    init();
};