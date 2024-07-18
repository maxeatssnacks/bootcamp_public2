/** BizTime express application. */


const express = require("express");

const app = express();
const ExpressError = require("./expressError");
const companiesRouter = require('./routes/companies.js');
const invoicesRouter = require('./routes/invoices.js');
const industriesRoutes = require('./routes/industries');

app.use(express.json());
app.use("/companies", companiesRouter);
app.use("/invoices", invoicesRouter);
app.use('/industries', industriesRoutes);

/** 404 handler */

app.use(function (req, res, next) {
  const err = new ExpressError("Not Found", 404);
  return next(err);
});

/** general error handler */

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message,
    error: process.env.NODE_ENV === 'production' ? {} : err.stack
  });
});

// app.listen(3000, function () {
//   console.log('App on port 3000');
// })

module.exports = app;
