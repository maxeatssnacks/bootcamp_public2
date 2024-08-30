import React from 'react';
import { useParams, Navigate } from 'react-router-dom';

function DogDetails({ dogs }) {
    const { name } = useParams();
    const dog = dogs.find(
        d => d.name.toLowerCase() === name.toLowerCase()
    );

    if (!dog) return <Navigate to="/dogs" />;

    return (
        <div className="DogDetails">
            <div className="row justify-content-center mt-5">
                <div className="col-11 col-lg-5">
                    <div className="DogDetails-card card">
                        <img className="card-img-top" src={dog.src} alt={dog.name} />
                        <div className="card-body">
                            <h2 className="card-title">{dog.name}</h2>
                            <h4 className="card-subtitle text-muted">{dog.age} years old</h4>
                        </div>
                        <ul className="list-group list-group-flush">
                            {dog.facts.map((fact, i) => (
                                <li className="list-group-item" key={i}>
                                    {fact}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DogDetails;