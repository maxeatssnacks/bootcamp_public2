import React, { useState } from 'react';
import NewTodoForm from './NewTodoForm';
import Todo from './Todo';
import { v4 as uuid } from 'uuid';
import "./TodoList.css";

const TodoList = () => {
    const [tasks, setTasks] = useState([]);

    const addTodo = (newTodo) => {
        setTasks(tasks => [...tasks, { ...newTodo, id: uuid() }]);
    };

    const removeTodo = (id) => {
        setTasks(tasks => tasks.filter(task => task.id !== id));
    };

    return (
        <div className="TodoApp">
            <h3>Let's Git R Done</h3>
            <NewTodoForm addTodo={addTodo} />
            <ul className="TodoList">
                {tasks.map(({ id, task }) => (
                    <Todo key={id} id={id} task={task} removeTodo={removeTodo} />
                ))}
            </ul>
        </div>
    );
};

export default TodoList;