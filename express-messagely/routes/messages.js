const express = require("express");
const messageRouter = new express.Router();
const ExpressError = require("../expressError");
const jwt = require("jsonwebtoken");
const { ensureCorrectUser, ensureLoggedIn } = require("../middleware/auth")
const { SECRET_KEY } = require("../config");
const Message = require("../models/message")

/** GET /:id - get detail of message.
 *
 * => {message: {id,
 *               body,
 *               sent_at,
 *               read_at,
 *               from_user: {username, first_name, last_name, phone},
 *               to_user: {username, first_name, last_name, phone}}
 *
 * Make sure that the currently-logged-in users is either the to or from user.
 *
 **/

messageRouter.get('/:id', ensureLoggedIn, async (req, res, next) => {
    try {
        const { id } = req.params;
        const message = await Message.get(id);

        // Check if the logged-in user is either the sender or recipient
        if (req.user.username !== message.from_user.username &&
            req.user.username !== message.to_user.username) {
            throw new ExpressError("Unauthorized", 401);
        }

        return res.json({ message });
    } catch (err) {
        return next(err);
    }
});


/** POST / - post message.
 *
 * {to_username, body} =>
 *   {message: {id, from_username, to_username, body, sent_at}}
 *
 **/

messageRouter.post('/', ensureLoggedIn, async (req, res, next) => {
    try {
        const { to_username, body } = req.body;
        const from_username = body.token.from_username;
        if (!body) {
            throw new ExpressError("Please make sure to include a message!", 400);
        }
        const message = await Message.create(from_username, to_username, body);
        return res.json({ message })
    } catch (err) {
        return next(err);
    }
})

/** POST/:id/read - mark message as read:
 *
 *  => {message: {id, read_at}}
 *
 * Make sure that the only the intended recipient can mark as read.
 *
 **/

messageRouter.post('/:id/read', ensureLoggedIn, async (req, res, next) => {
    try {
        const { id } = req.params;
        const message = await Message.get(id);

        // Check if the logged-in user is the recipient
        if (req.user.username !== message.to_user.username) {
            throw new ExpressError("Unauthorized", 401);
        }

        const result = await Message.markRead(id);
        return res.json({ message: result });
    } catch (err) {
        return next(err);
    }
});