import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from './TodoList';

// Smoke test
test('TodoList renders without crashing', () => {
    render(<TodoList />);
});

// Snapshot test
test('TodoList matches snapshot', () => {
    const { asFragment } = render(<TodoList />);
    expect(asFragment()).toMatchSnapshot();
});

// Critical business logic test
test('can add a new todo', () => {
    render(<TodoList />);

    // Find the input and add button
    const input = screen.getByPlaceholderText('Enter a task here');
    const addButton = screen.getByText('Add Task');

    // Add a new todo
    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.click(addButton);

    // Check if the new todo is in the document
    expect(screen.getByText('New Todo')).toBeInTheDocument();
});

test('can remove a todo', () => {
    render(<TodoList />);

    // Add a new todo
    const input = screen.getByPlaceholderText('Enter a task here');
    const addButton = screen.getByText('Add Task');
    fireEvent.change(input, { target: { value: 'Todo to remove' } });
    fireEvent.click(addButton);

    // Find and click the delete button
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    // Check if the todo is removed from the document
    expect(screen.queryByText('Todo to remove')).not.toBeInTheDocument();
});