const helper = require('../helper.js');
const React = require('react');
const { useState } = React;
const { createRoot } = require('react-dom/client');
const { ProjectList } = require('../ProjectList.jsx');
const {TextInput } = require('../TextInput.jsx');

const handleLogin = (e, formData) => {
    // Prevent Default
    e.preventDefault();
    helper.hideError();

    const {username, pass} = formData;
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
        <form id="loginForm"
            name="loginForm"
            onSubmit={e => handleLogin(e, {username, pass})}
            action="/login"
            method="POST"
            className="mainForm"
        >
            <TextInput inputName={"Username"} placeholder={""} value={username}
                            action={props.action} onChange={(e)=>{setUsername(e.target.value)}} />
            <TextInput inputName={"Password"} placeholder={""} value={pass} usePass={true}
                            action={props.action} onChange={(e)=>{setPass(e.target.value)}} />
            {/* <div class="field">
                <label class="label">Name</label>
                <div class="control">
                    <input type="text" id="user" name="username" placeholder="username" />
                </div>
            </div>
            <label className='field'>Password:
                <input type="password" id="pass" name='pass' placeholder='password' />
            </label> */}
            <input className='submit' type='submit' value="Sign In" />
        </form>
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

const ProjectDisplay = (props) => {
    const [reloadProjects, setReloadProjects] = useState(false);

    const featuredFilter = (project) => {
        console.log(project.isFeatured);
        return project.isFeatured;
    };

    return <ProjectList
        projects={[]}
        filters={[featuredFilter]}
        reloadProjectState={reloadProjects}
        triggerReload={() => setReloadProjects(!reloadProjects)} />;
}

const init = () => {
    const loginButton = document.getElementById('loginButton');
    const signupButton = document.getElementById('signupButton');

    const root = createRoot(document.getElementById('content'));

    root.render(<ProjectDisplay />);

    loginButton.addEventListener('click', (e) => {
        e.preventDefault();
        root.render(<LoginWindow />);
        return false;
    });

    signupButton.addEventListener('click', (e) => {
        e.preventDefault();
        root.render(<ProjectDisplay />);
        return false;
    });
}

window.onload = () => {
    init();
    console.log("just loaded");
};