const React = require('react');

const ContactBar = () => {
    return (
        <div id='contactBar' class="container">
            <nav class='level'>
                <a class='linkButton' target='_blank' href="https://github.com/WilsonXia">
                    <span class="icon is-large">
                        <img src="/assets/img/github.svg" alt="github logo" />
                    </span>
                </a>
                <a class='linkButton' target='_blank' href="https://www.linkedin.com/in/wilson-xia/">
                    <span class="icon is-large">
                        <img src="/assets/img/linkedIn.svg" alt="linkedIn logo" />
                    </span>
                </a>
                <a class='linkButton' href="mailto:workingsonxia@gmail.com">
                    <span class="icon is-large">
                        <img src="/assets/img/email.svg" alt="email logo" />
                    </span>
                </a>
                <a class='linkButton' href="tel:+16468259604">
                    <span class="icon is-large">
                        <img src="/assets/img/phone.svg" alt="phone logo" />
                    </span>
                </a>
            </nav>
        </div>
    )
}

module.exports = {ContactBar};