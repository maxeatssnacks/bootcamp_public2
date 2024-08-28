import React from "react"
import { Link } from "react-router-dom";

const Snack = ({ name }) => {

    return (
        <div>
            <h1>You've selected {name} !</h1>
            <Link to="/">Back to the Snack Shack</Link>
        </div>
    )
}

export default Snack;