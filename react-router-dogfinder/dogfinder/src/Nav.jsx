import React from 'react';
import { Link } from 'react-router-dom';

function Nav({ dogs }) {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                {dogs.map(dog => (
                    <li key={dog.name}>
                        <Link to={`/dogs/${dog.name.toLowerCase()}`}>{dog.name}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Nav;