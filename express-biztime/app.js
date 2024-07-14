/** BizTime express application. */


const express = require("express");

const app = express();
const ExpressError = require("./expressError")
const companiesRouter = require('./routes/companies.js')
const invoicesRouter = require('./routes/invoices.js')

app.use(express.json());
app.use("/companies", companiesRouter);
app.use("/invoices", invoicesRouter);

/** 404 handler */

app.use(function (req, res, next) {
  const err = new ExpressError("Not Found", 404);
  return next(err);
});

/** general error handler */

app.use((err, req, res, next) => {
  res.status(err.status || 500);

  return res.json({
    error: err,
    message: err.message
  });
});

app.listen(3000, function () {
  console.log('App on port 3000');
})

module.exports = app;
