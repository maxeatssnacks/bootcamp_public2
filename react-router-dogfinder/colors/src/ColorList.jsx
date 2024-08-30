import React from 'react';
import { Link } from 'react-router-dom';

function ColorList({ colors }) {
    return (
        <div>
            <h1>Color List</h1>
            {colors.map(color => (
                <p key={color.name}>
                    <Link to={`/colors/${color.name}`}>{color.name}</Link>
                </p>
            ))}
            <p>
                <Link to="/colors/new">Add a new color</Link>
            </p>
        </div>
    );
}

export default ColorList;