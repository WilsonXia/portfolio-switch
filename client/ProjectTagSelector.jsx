const helper = require('./helper.js');
const React = require('react');
const { useState, useEffect } = React;

const Tags = [
    "Personal",
    "Academic",
    "2D",
    "3D",
    "Unity",
    "Unreal",
    "Website",
    "Game",
]

const ProjectTagSelector = (props) => {
    // uses an array to keep track of what is selected

    const handleChange = (option) => {
        if (props.selected.includes(option)) {
            // take out that option
            props.setSelected(props.selected.filter((item) => item !== option));
        } else {
            // add that option
            props.setSelected([...props.selected, option]);
        }
    }

    const inputTags = Tags.map((t) => {
        return <div className='tag'>
            <label key={t}>{t} </label>
            <input
                type="checkbox" 
                checked={props.selected.includes(t)}
                onChange={()=> handleChange(t)}
            />
        </div>
    });
    return (
        <div id='tagsContainer'>
            <label>Tags</label>
            {inputTags}
            <h2 hidden>{props.selected}</h2>
        </div>
    )
}

module.exports = {ProjectTagSelector};