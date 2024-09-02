import React, { useState } from 'react';
import MadlibForm from './MadlibsForm';
import Story from './Story';

const Madlib = () => {
    const [story, setStory] = useState(null);

    const handleSubmit = (inputs) => {
        setStory(inputs);
    };

    // Handle submits sets inputs to the story state
    // Which is then used as a prop in Story
    // The play again button sets the story back to null, which shows the form again instead of the story.
    return (
        <div>
            <h1>Madlibs!</h1>
            {!story ? (
                <MadlibForm onSubmit={handleSubmit} />
            ) : (
                <div>
                    <Story words={story} />
                    <button
                        onClick={() => setStory(null)}
                    >
                        Play Again
                    </button>
                </div>
            )}
        </div>
    );
};

export default Madlib;