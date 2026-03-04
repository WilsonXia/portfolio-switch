const React = require('react');
const { useState } = React;

const TextInput = (props) => {
    const [value, setValue] = useState("");

    const inputNameL = props.inputName.toLowerCase();
    // if(props.inputName.includes(" ")){
    //     let nameWords;
    //     nameWords = props.inputName.split(" ");
    //     inputNameL += nameWords[0].toLowerCase();
    //     for(let i = 1; i < nameWords.length; i++) {
    //         inputNameL += nameWords[i];
    //     }
    // }

    return (<>
        <label>{props.inputName}: </label>
        <input type="text"
            id={props.action + props.inputName}
            name={inputNameL}
            placeholder={props.placeholder}
            onChange={(e)=>{setValue(e.target.value)}}
            value={value} />
    </>);
}

module.exports = { TextInput };