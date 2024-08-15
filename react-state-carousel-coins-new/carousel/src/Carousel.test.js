import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Carousel from './Carousel';
import TEST_IMAGES from "./_testCommon.js";

describe("Carousel component", function () {
  // Smoke test
  it("renders without crashing", function () {
    render(<Carousel photos={TEST_IMAGES} title="Test Carousel" />);
  });

  // Snapshot test
  it("matches snapshot", function () {
    const { asFragment } = render(<Carousel photos={TEST_IMAGES} title="Test Carousel" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("works when you click on the right arrow", function () {
    const { container, getByAltText, queryByAltText } = render(
      <Carousel photos={TEST_IMAGES} title="images for testing" />
    );

    // expect the first image to show, but not the second
    expect(getByAltText("testing image 1")).toBeInTheDocument();
    expect(queryByAltText("testing image 2")).not.toBeInTheDocument();

    // move forward in the carousel
    const rightArrow = container.querySelector(".bi-arrow-right-circle");
    fireEvent.click(rightArrow);

    // expect the second image to show, but not the first
    expect(queryByAltText("testing image 1")).not.toBeInTheDocument();
    expect(getByAltText("testing image 2")).toBeInTheDocument();
  });

  it("moves backward when you click on the left arrow", function () {
    const { container, getByAltText, queryByAltText } = render(
      <Carousel photos={TEST_IMAGES} title="images for testing" />
    );

    // Move to the second image
    const rightArrow = container.querySelector(".bi-arrow-right-circle");
    fireEvent.click(rightArrow);

    // Now move back to the first image
    const leftArrow = container.querySelector(".bi-arrow-left-circle");
    fireEvent.click(leftArrow);

    // Expect the first image to show again
    expect(getByAltText("testing image 1")).toBeInTheDocument();
    expect(queryByAltText("testing image 2")).not.toBeInTheDocument();
  });

  it("doesn't move past the first image when on the first image", function () {
    const { container, getByAltText } = render(
      <Carousel photos={TEST_IMAGES} title="images for testing" />
    );

    // Try to move backward
    const leftArrow = container.querySelector(".bi-arrow-left-circle");
    fireEvent.click(leftArrow);

    // Expect to still be on the first image
    expect(getByAltText("testing image 1")).toBeInTheDocument();
  });

  it("doesn't move past the last image when on the last image", function () {
    const { container, getByAltText } = render(
      <Carousel photos={TEST_IMAGES} title="images for testing" />
    );

    // Move to the last image
    const rightArrow = container.querySelector(".bi-arrow-right-circle");
    fireEvent.click(rightArrow);
    fireEvent.click(rightArrow);

    // Try to move forward again
    fireEvent.click(rightArrow);

    // Expect to still be on the last image
    expect(getByAltText("testing image 3")).toBeInTheDocument();
  });
});