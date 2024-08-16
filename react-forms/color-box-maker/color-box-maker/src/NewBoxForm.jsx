import { useState } from "react";

const NewBoxForm = ({ createBox }) => {
    const INITIAL_STATE = { id: '', color: "#ffffff", width: 100, height: 100 };
    const [formData, setFormData] = useState(INITIAL_STATE);

    const handleSubmit = evt => {
        evt.preventDefault();
        createBox({ ...formData });
        setFormData(INITIAL_STATE);

    }

    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(formData => ({
            ...formData,
            [name]: name === 'width' || name === 'height' ? parseInt(value) : value
        }))
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="color">Color: </label>
            <input id="color" name="color" type="color" value={formData.color} onChange={handleChange} />
            <label htmlFor="width">Width: </label>
            <input id="width" name="width" type="number" value={formData.width} onChange={handleChange} />
            <label htmlFor="height">Height: </label>
            <input id="height" name="height" type="number" value={formData.height} onChange={handleChange} />
            <button type="submit">Create a new box!</button>
        </form>
    )
}

export default NewBoxForm;