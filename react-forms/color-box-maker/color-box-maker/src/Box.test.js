import React from 'react';
import { render } from '@testing-library/react';
import Box from './Box';

describe('Box', () => {
    // Smoke test
    test('renders without crashing', () => {
        render(<Box id="1" color="#FF0000" width={100} height={100} />);
    });

    // Snapshot test
    test('matches snapshot', () => {
        const { asFragment } = render(<Box id="1" color="#FF0000" width={100} height={100} />);
        expect(asFragment()).toMatchSnapshot();
    });

    // Critical business logic test
    test('has correct style properties', () => {
        const { container } = render(<Box id="1" color="#FF0000" width={100} height={100} />);
        const box = container.firstChild;

        expect(box).toHaveStyle('background-color: #FF0000');
        expect(box).toHaveStyle('width: 100px');
        expect(box).toHaveStyle('height: 100px');
    });
});