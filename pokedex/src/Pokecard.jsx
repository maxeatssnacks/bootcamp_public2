import './Pokecard.css';

const Pokecard = (props) => {
    return (
        <div className="Pokecard">
            <h4>{props.name}</h4>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id}.png`} />
            <p>Type: {props.type}</p>
            <p>EXP: {props.base_experience}</p>
        </div>
    )
}

export default Pokecard;