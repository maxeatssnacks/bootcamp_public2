import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Todo from './Todo';

// Smoke test
test('Todo renders without crashing', () => {
    render(<Todo id="1" task="Test todo" removeTodo={() => { }} />);
});

// Snapshot test
test('Todo matches snapshot', () => {
    const { asFragment } = render(<Todo id="1" task="Test todo" removeTodo={() => { }} />);
    expect(asFragment()).toMatchSnapshot();
});

// Critical business logic test
test('calls removeTodo when delete button is clicked', () => {
    const mockRemoveTodo = jest.fn();
    render(<Todo id="1" task="Test todo" removeTodo={mockRemoveTodo} />);

    // Find and click the delete button
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    // Check if removeTodo was called with the correct id
    expect(mockRemoveTodo).toHaveBeenCalledWith('1');
});