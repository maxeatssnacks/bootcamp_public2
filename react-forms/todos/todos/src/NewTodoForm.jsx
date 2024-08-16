import React, { useState } from "react";
import "./NewTodoForm.css";

const NewTodoForm = ({ addTodo }) => {
    const INITIAL_STATE = { task: '' };
    const [formData, setFormData] = useState(INITIAL_STATE);

    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }));
    };

    const handleSubmit = evt => {
        evt.preventDefault();
        if (formData.task.trim()) {
            addTodo({ ...formData });
            setFormData(INITIAL_STATE);
        }
    };

    return (
        <div className="NewTodoForm">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="task"
                    name="task"
                    value={formData.task}
                    onChange={handleChange}
                    placeholder="Enter a task here"
                />
                <button type="submit">Add Task</button>
            </form>
        </div>
    );
};

export default NewTodoForm;