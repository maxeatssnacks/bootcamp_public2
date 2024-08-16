import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Boxlist from './Boxlist';

describe('Boxlist', () => {
    // Smoke test
    test('renders without crashing', () => {
        render(<Boxlist />);
    });

    // Snapshot test
    test('matches snapshot', () => {
        const { asFragment } = render(<Boxlist />);
        expect(asFragment()).toMatchSnapshot();
    });

    // Critical business logic test
    test('can add a new box', () => {
        render(<Boxlist />);

        // Find form inputs and submit button
        const colorInput = screen.getByLabelText('Color:');
        const widthInput = screen.getByLabelText('Width:');
        const heightInput = screen.getByLabelText('Height:');
        const submitButton = screen.getByText('Create a new box!');

        // Fill out the form
        fireEvent.change(colorInput, { target: { value: '#FF0000' } });
        fireEvent.change(widthInput, { target: { value: '100' } });
        fireEvent.change(heightInput, { target: { value: '100' } });

        // Submit the form
        fireEvent.click(submitButton);

        // Check if a new box is added to the DOM
        const boxes = screen.getAllByRole('generic').filter(element => element.id);
        expect(boxes.length).toBe(1);
        expect(boxes[0]).toHaveStyle('background-color: #FF0000');
        expect(boxes[0]).toHaveStyle('width: 100px');
        expect(boxes[0]).toHaveStyle('height: 100px');
    });
});