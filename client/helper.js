const handleError = (message) => {
    console.log('Server sent back a message: ');
    console.log(message);
    document.getElementById('errorMessage').textContent = message;
    document.getElementById('errorBox').classList.remove('hidden');
};

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
    hideError,
    handleError,
    sendPost,
    sendPostFile
}