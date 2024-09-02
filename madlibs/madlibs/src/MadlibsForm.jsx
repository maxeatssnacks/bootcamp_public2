import React, { useState } from 'react';

const MadlibForm = ({ onSubmit }) => {
    const [inputs, setInputs] = useState({
        noun1: '',
        adjective1: '',
        verb1: '',
        adverb1: '',
        noun2: '',
    });


    // Handles any changes in the form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(prevInputs => ({ ...prevInputs, [name]: value }));
    };

    // Handles submission of the form
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(inputs);
    };


    // Form is listening for changes at each input level and when it is submitted it
    // will run the setStory function in it's parent component
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="noun1">Noun:</label>
                <input
                    type="text"
                    id="noun1"
                    name="noun1"
                    value={inputs.noun1}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="adjective1" >Adjective:</label>
                <input
                    type="text"
                    id="adjective1"
                    name="adjective1"
                    value={inputs.adjective1}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="verb1">Verb:</label>
                <input
                    type="text"
                    id="verb1"
                    name="verb1"
                    value={inputs.verb1}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="adverb1">Adverb:</label>
                <input
                    type="text"
                    id="adverb1"
                    name="adverb1"
                    value={inputs.adverb1}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="noun2">Another Noun:</label>
                <input
                    type="text"
                    id="noun2"
                    name="noun2"
                    value={inputs.noun2}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">
                Generate Madlib
            </button>
        </form>
    );
};

export default MadlibForm;