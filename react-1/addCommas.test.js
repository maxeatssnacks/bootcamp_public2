const addCommas = require("./addCommas");

describe("#addCommas", () => {
  test("it is a function", () => {
    expect(typeof addCommas).toBe("function");
  });

  test('formats 1234 correctly', () => {
    expect(addCommas(1234)).toBe("1,234");
  });

  test('formats 1000000 correctly', () => {
    expect(addCommas(1000000)).toBe("1,000,000");
  });

  test('formats 9876543210 correctly', () => {
    expect(addCommas(9876543210)).toBe("9,876,543,210");
  });

  test('formats 6 correctly', () => {
    expect(addCommas(6)).toBe("6");
  });

  test('formats -10 correctly', () => {
    expect(addCommas(-10)).toBe("-10");
  });

  test('formats -5678 correctly', () => {
    expect(addCommas(-5678)).toBe("-5,678");
  });

  test('formats 12345.678 correctly', () => {
    expect(addCommas(12345.678)).toBe("12,345.678");
  });

  test('formats -3141592.65 correctly', () => {
    expect(addCommas(-3141592.65)).toBe("-3,141,592.65");
  });
});
