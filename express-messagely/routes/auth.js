const express = require("express");
const authRouter = new express.Router();
const ExpressError = require("../expressError");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const User = require("../models/user")


/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */

authRouter.post('/register', async (req, res, next) => {
    try {
        const { username, password, first_name, last_name, phone } = req.body;
        if (!username || !password || !first_name || !last_name || !phone) {
            throw new ExpressError("Please provide all needed info", 400);
        }
        const newUser = await User.register({ username, password, first_name, last_name, phone });
        if (newUser) {
            await User.updateLoginTimestamp(username);
            const token = jwt.sign({ username }, SECRET_KEY);
            return res.json({ token })
        }
    } catch (err) {
        if (err.code === "23505") {
            return next(new ExpressError("Username taken. Please pick another!", 400));
        }
        return next(err);
    }
})

/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/

authRouter.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            throw new ExpressError("Username and password are required", 400);
        }
        const user = await User.authenticate(username, password);
        if (user) {
            await User.updateLoginTimestamp(username);
            const token = jwt.sign({ username }, SECRET_KEY);
            return res.json({ token })
        }
        throw new ExpressError("Invalid username/password", 400);
    } catch (err) {
        return next(err);
    }
})