"use strict";

/** Express app for jobly. */

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { NotFoundError, UnauthorizedError } = require("./expressError");
const { authenticateJWT } = require("./middleware/auth");
const authRoutes = require("./routes/auth");
const companiesRoutes = require("./routes/companies");
const usersRoutes = require("./routes/users");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

app.use("/auth", authRoutes);
app.use("/companies", authenticateJWT, companiesRoutes);
app.use("/users", authenticateJWT, usersRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to Jobly!');
});

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);

  if (err instanceof UnauthorizedError) {
    return res.status(401).json({ error: err.message });
  }

  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;