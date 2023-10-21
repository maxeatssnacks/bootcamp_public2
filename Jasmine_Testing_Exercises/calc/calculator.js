window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      console.log("click is working");
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  let defaultAmount = document.getElementById("loan-amount").value = 100000;
  let defaultYears = document.getElementById("loan-years").value = 10;
  let defaultRate = document.getElementById("loan-rate").value = 8;
  let defaults = {
    amount: defaultAmount,
    years: defaultYears,
    rate: defaultRate
  }
  update(defaults);
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  updateMonthly(calculateMonthlyPayment(getCurrentUIValues()));
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  let P = values.amount;
  let n = values.years * 12;
  let i = values.rate / 12 / 100;

  let monthlyPayment = ((P * i) / (1 - Math.pow(i+1, (-1*n))));
  let monthlyRounded = Math.round(monthlyPayment * 100) / 100;
  return `${monthlyRounded}`
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  document.getElementById("monthly-payment").innerText = "$" + monthly;
}
