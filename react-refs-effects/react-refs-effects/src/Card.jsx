import React from "react";

const Card = ({ src, alt = "This is an image of a card" }) => {
    return (
        <img src={src} alt={alt} />
    )
}

export default Card;