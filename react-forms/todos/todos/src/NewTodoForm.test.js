import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import NewTodoForm from './NewTodoForm';

// Smoke test
test('NewTodoForm renders without crashing', () => {
    render(<NewTodoForm addTodo={() => { }} />);
});

// Snapshot test
test('NewTodoForm matches snapshot', () => {
    const { asFragment } = render(<NewTodoForm addTodo={() => { }} />);
    expect(asFragment()).toMatchSnapshot();
});

// Critical business logic test
test('form submits correctly', () => {
    const mockAddTodo = jest.fn();
    render(<NewTodoForm addTodo={mockAddTodo} />);

    // Find the input and add button
    const input = screen.getByPlaceholderText('Enter a task here');
    const addButton = screen.getByText('Add Task');

    // Fill out the form and submit
    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.click(addButton);

    // Check if the addTodo function was called with the correct argument
    expect(mockAddTodo).toHaveBeenCalledWith({ task: 'New Todo' });

    // Check if the input is cleared after submission
    expect(input.value).toBe('');
});