import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NewBoxForm from './NewBoxForm';

describe('NewBoxForm', () => {
    // Smoke test
    test('renders without crashing', () => {
        render(<NewBoxForm createBox={() => { }} />);
    });

    // Snapshot test
    test('matches snapshot', () => {
        const { asFragment } = render(<NewBoxForm createBox={() => { }} />);
        expect(asFragment()).toMatchSnapshot();
    });

    // Critical business logic test
    test('form submits correctly', () => {
        const mockCreateBox = jest.fn();
        render(<NewBoxForm createBox={mockCreateBox} />);

        // Find form inputs and submit button
        const colorInput = screen.getByLabelText('Color:');
        const widthInput = screen.getByLabelText('Width:');
        const heightInput = screen.getByLabelText('Height:');
        const submitButton = screen.getByText('Create a new box!');

        // Fill out the form
        fireEvent.change(colorInput, { target: { value: '#00FF00' } });
        fireEvent.change(widthInput, { target: { value: '200' } });
        fireEvent.change(heightInput, { target: { value: '150' } });

        // Submit the form
        fireEvent.click(submitButton);

        // Check if createBox was called with the correct arguments
        expect(mockCreateBox).toHaveBeenCalledWith(expect.objectContaining({
            id: '',
            color: expect.stringMatching(/^#00ff00$/i),  // case-insensitive match
            width: 200,
            height: 150
        }));

        // Check if form fields are reset after submission
        expect(colorInput.value.toLowerCase()).toBe('#ffffff');
        expect(widthInput.value).toBe('100');
        expect(heightInput.value).toBe('100');
    });
});