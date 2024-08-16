import React from 'react';
import "./Todo.css";

const Todo = ({ id, task, removeTodo }) => {
    return (
        <li className="Todo">
            <span className="Todo-task">{task}</span>
            <button className="Todo-remove" onClick={() => removeTodo(id)}>Delete</button>
        </li>
    );
};

export default Todo;