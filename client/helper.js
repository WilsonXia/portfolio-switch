const React = require('react');
const handleError = (message) => {
    console.log('Server sent back a message: ');
    console.log(message);
    document.getElementById('errorMessage').textContent = message;
    document.getElementById('errorBox').classList.remove('hidden');
};

const handleProjectSelect = (project) => {
    // grab all element ids and match them
    console.log(project);
    console.log(project.tags);
    document.getElementById('projectPopup').classList.remove('hidden');
    document.getElementById('popupName').textContent = project.name;
    const tagElements = project.tags.map((tag) => {
        return `<span class="tag">${tag}</span>`;
    });
    console.log(tagElements);
    document.getElementById('popupTags').innerHTML = tagElements.join("");
    if (project.externalLink) {
        document.getElementById('popupLink').classList.remove('hidden');
        document.getElementById('popupLink').href = project.externalLink;
    }
    else {
        document.getElementById('popupLink').classList.add('hidden');

    }
    if (project.githubLink) {
        document.getElementById('popupGithub').href = project.githubLink;
        document.getElementById('popupGithub').classList.remove('hidden');
    } else {
        document.getElementById('popupGithub').classList.add('hidden');
    }
    if (project.isFeatured) {
        document.getElementById('popupFeatured').src = "/assets/img/star-full.svg";
    }
    else {
        document.getElementById('popupFeatured').src = "/assets/img/star-empty.svg";
    }
    document.getElementById('popupCover').style.backgroundImage = `url(${project.images[0]})`;
}

const displayCurrentTime = () => {
    const now = new Date();
    // Use toLocaleTimeString() for easy formatting
    const timeString = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    document.getElementById("clock-display").innerHTML = timeString;
}

const hideError = () => {
    if (document.getElementById('errorBox'))
        document.getElementById('errorBox').classList.add('hidden');
}

/* Sends post requests to the server using fetch. Will look for various
   entries in the response JSON object, and will handle them appropriately.
*/
const sendPost = async (url, data, handler) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();
    hideError();

    if (result.redirect) {
        window.location = result.redirect;
    }

    if (result.error) {
        handleError(result.error);
    }

    if (handler) {
        console.log('Calling handler method...');
        handler(result);
    }
};

const sendPostFile = async (url, data, handler) => {
    const response = await fetch(url, {
        method: 'POST',
        body: data, // Client-side should pass in a FormData obj
    });

    const result = await response.json();
    hideError();

    if (result.redirect) {
        window.location = result.redirect;
    }

    if (result.error) {
        handleError(result.error);
    }

    if (handler) {
        console.log('Calling handler method...');
        handler(result);
    }
};

const sendDelete = async (url, handler) => {
    const response = await fetch(url, {
        method: 'DELETE',
    });

    const result = await response.json();
    hideError();

    if (result.error) {
        handleError(result.error);
    }

    if (handler) {
        console.log('Calling handler method...');
        handler(result);
    }
}

const convertFormData = (formData) => {
    const formObject = Object.fromEntries(formData.entries());
    console.log(formObject);
    return formObject;
}

const toggleBurger = () => {
    // Get the nav-menu and toggle it
    const navMenu = document.querySelector(".navbar-menu");
    navMenu.classList.toggle("is-active");
}

module.exports = {
    convertFormData,
    toggleBurger,
    displayCurrentTime,
    hideError,
    handleError,
    handleProjectSelect,
    sendPost,
    sendPostFile,
    sendDelete
}