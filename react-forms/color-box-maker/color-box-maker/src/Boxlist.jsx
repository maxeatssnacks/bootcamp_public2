import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import NewBoxForm from './NewBoxForm';
import Box from './Box';

const Boxlist = () => {
    const INITIAL_STATE = [];
    const [boxes, setBoxes] = useState(INITIAL_STATE);

    const createBox = (newBox) => {
        setBoxes(boxes => [...boxes, { ...newBox, id: uuid() }])
    }
    return (
        <div>
            <h3>Box-mania!</h3>
            <NewBoxForm createBox={createBox} />
            <div>
                {boxes.map(({ id, color, width, height }) => (
                    <Box key={id} id={id} color={color} width={width} height={height} />
                ))}
            </div>
        </div>
    )
}

export default Boxlist;