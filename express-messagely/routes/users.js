const express = require("express");
const userRouter = new express.Router();
const ExpressError = require("../expressError");
const jwt = require("jsonwebtoken");
const { ensureCorrectUser, ensureLoggedIn } = require("../middleware/auth")
const { SECRET_KEY } = require("../config");
const User = require("../models/user")


/** GET / - get list of users.
 *
 * => {users: [{username, first_name, last_name, phone}, ...]}
 *
 **/

userRouter.get("/", ensureLoggedIn, async (req, res, next) => {
    try {
        const results = await User.all();
        return res.json({ users: results.rows })
    } catch (err) {
        return next(err);
    }
})

/** GET /:username - get detail of users.
 *
 * => {user: {username, first_name, last_name, phone, join_at, last_login_at}}
 *
 **/

userRouter.get("/:username", ensureCorrectUser, async (req, res, next) => {
    try {
        const { username } = req.params;
        const results = await User.get(username);
        return res.json({ user: results.rows[0] })
    } catch (err) {
        return next(err);
    }
})

/** GET /:username/to - get messages to user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 from_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/

userRouter.get("/:username/to", ensureCorrectUser, async (req, res, next) => {
    try {
        const { username } = req.params;
        const results = await User.messagesTo(username);
        return res.json({ messages: results.rows })
    } catch (err) {
        return next(err);
    }
})

/** GET /:username/from - get messages from user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 to_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/

userRouter.get("/:username/from", ensureCorrectUser, async (req, res, next) => {
    try {
        const { username } = req.params;
        const results = await User.messagesFrom(username);
        return res.json({ messages: results.rows });
    } catch (err) {
        return next(err);
    }
})