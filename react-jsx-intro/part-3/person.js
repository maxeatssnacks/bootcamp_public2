const Person = (props) => {

    const vote = props.age >= 18 ? "please go vote!" : "you must be 18";
    const name = props.name.length > 8 ? props.name.slice(0, 6) : props.name;

    return (
        <div>
            <p>Learn some information about this person.</p>
            <p>{name} is {props.age} years old.</p>
            <h3>{vote}</h3>
            <ul>
                {props.hobbies.map(h => <li>{h}</li>)}
            </ul>
        </div>
    )
}