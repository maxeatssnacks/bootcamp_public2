import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';

function Color({ colors }) {
    const { color } = useParams();
    const colorObj = colors.find(c => c.name === color);

    if (!colorObj) {
        return <Navigate replace to="/colors" />;
    }

    return (
        <div style={{ backgroundColor: colorObj.value, textAlign: 'center' }}>
            <h1>This is {colorObj.name}</h1>
            <p>Isn't it beautiful?</p>
            <p>
                <Link to="/colors">Go back</Link>
            </p>
        </div>
    );
}

export default Color;