import React from "react";

const Box = ({ id, color, width, height }) => {
    const boxStyle = {
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: color
    }

    return (
        <div id={id} style={boxStyle}></div>
    )
}

export default Box;