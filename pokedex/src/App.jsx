import React from 'react';
import Pokecard from './Pokecard.jsx';
import Pokedex from './assets/Pokedex.js';
import './App.css';

const App = () => {
    return (
        <>
            <h2>Pokedex</h2>
            <div className="Pokedex">
                {Pokedex.map(pokemon => (
                    <Pokecard
                        key={pokemon.id}
                        id={pokemon.id}
                        name={pokemon.name}
                        type={pokemon.type}
                        base_experience={pokemon.base_experience}
                    />
                ))}
            </div>
        </>
    )
}

export default App;