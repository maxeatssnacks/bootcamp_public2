import { render } from '@testing-library/react';
import Card from './Card';
import '@testing-library/jest-dom';

describe('Card component', () => {
    const defaultProps = {
        caption: "Test Caption",
        src: "test-image.jpg",
        currNum: 1,
        totalNum: 3
    };

    // Smoke test
    it('renders without crashing', () => {
        render(<Card {...defaultProps} />);
    });

    // Snapshot test
    it('matches snapshot', () => {
        const { asFragment } = render(<Card {...defaultProps} />);
        expect(asFragment()).toMatchSnapshot();
    });
});