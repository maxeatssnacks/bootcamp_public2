
it('should calculate the monthly rate correctly', function () {
  const values = {
    amount: 10000,
    years: 8,
    rate: 10
  }
  expect(calculateMonthlyPayment(values).toEqual(151.74));
});

it("should return a result with 2 decimal places", function() {
  const values = {
    amount: 10000,
    years: 12,
    rate: 9
  }
  expect(calculateMonthlyPayment(values).toEqual(113.80));
});

it("should handle a high rate", function() {
  const values = {
    amount: 10000,
    years: 4,
    rate: 88.25
  }
  expect(calculateMonthlyPayment(values).toEqual(760.64));
});

it("should handle a low rate", function() {
  const values = {
    amount: 10000,
    years: 8,
    rate: .05
  }
  expect(calculateMonthlyPayment(values).toEqual(106.29));
});
