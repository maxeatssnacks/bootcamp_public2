import React, { useState } from 'react';
import answers from './eightballData';

const Eightball = () => {

    const [message, setMessage] = useState("Think of a Question");
    const [color, setColor] = useState("black");

    function handleClick() {

        const randomIndex = Math.floor(Math.random() * answers.length);
        const { msg, color } = answers[randomIndex];
        setMessage(msg);
        setColor(color);
    }

    return (
        <button onClick={handleClick} style={{
            backgroundColor: color,
            color: 'white',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            textAlign: 'center',
            padding: '10px'
        }}>
            {message}
        </button>
    )
}

export default Eightball;