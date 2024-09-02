// Destructures the incoming props to just 'words' which are then used in the paragraph below
const Story = ({ words }) => {
    return (
        <div>
            <p>
                Once upon a time, there was a {words.adjective1} {words.noun1} who loved to {words.verb1} {words.adverb1}.
                One day, while {words.verb1}ing, they stumbled upon a magical {words.noun2} and lived happily ever after.
            </p>
        </div>
    );
};

export default Story;