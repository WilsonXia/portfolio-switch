const React = require('react');
const { useState } = React;

const TextInput = (props) => {
    // Designed to be a Child of a main form
    // Reference values from properties
    let inputNameL = props.inputName.toLowerCase();
    // Check if inputName is multiple words
    if (props.inputName.includes(" ")) {
        // Combines them into camelCase
        inputNameL = "";
        const nameWords = props.inputName.split(" ");
        inputNameL += nameWords[0].toLowerCase(); // first word
        for (let i = 1; i < nameWords.length; i++) {
            // every preceding word remains capitalized
            // assuming 'Input Name' is given like so
            inputNameL += nameWords[i];
        }
    }

    return (<>
        <label>{props.inputName}:
            <input type="text"
                // id={props.action + inputNameL}
                name={inputNameL}
                placeholder={props.placeholder}
                onChange={props.onChange}
                value={props.value} />
        </label>
    </>);
}

module.exports = { TextInput };