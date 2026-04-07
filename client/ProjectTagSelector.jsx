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
            props.setSelected(props.selected.filter((item) => item !== option).filter(Boolean));
        } else {
            // add that option
            props.setSelected([...props.selected, option].filter(Boolean));
        }
    }

    const inputTags = Tags.map((t) => {
        return <div className='tag control'>
            <label
            key={t}
            className='checkbox'>
                <input
                className='checkbox'
                    type="checkbox"
                    checked={props.selected.includes(t)}
                    onChange={() => handleChange(t)}
                />
                {` ${t}`}
                </label>
        </div>
    });
    return (
        <div id='tagsContainer' className='field'>
            <label className='label'>Tags</label>
            <div className="checkboxes field">
                {inputTags}
            </div>
        </div>
    )
}

module.exports = { ProjectTagSelector };