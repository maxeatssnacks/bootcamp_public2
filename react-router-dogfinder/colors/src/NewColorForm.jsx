import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NewColorForm({ addColor }) {
    const [formData, setFormData] = useState({ name: '', value: '#000000' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(data => ({
            ...data,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addColor(formData);
        navigate('/colors');
    };

    return (
        <div>
            <h1>New Color Form</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Color name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="value">Color value:</label>
                    <input
                        type="color"
                        id="value"
                        name="value"
                        value={formData.value}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Add Color</button>
            </form>
        </div>
    );
}

export default NewColorForm;