const express = require("express");
const router = new express.Router();
const ExpressError = require('./expressError');
const items = require('./fakeDB')

router.get('/', function (req, res) {
    return res.json(items);
})

router.post('/', function (req, res) {
    const newItem = { name: req.body.name, price: req.body.price };
    items.push(newItem)
    res.status(201).json({ added: newItem })
})

router.get('/:name', function (req, res, next) {
    try {
        const foundItem = items.find(item => item.name === req.params.name)
        if (foundItem === undefined) {
            throw new ExpressError("Item not found", 404);
        }
        res.json(foundItem)
    } catch (e) {
        next(e);
    }
})

router.patch('/:name', function (req, res, next) {
    try {
        const foundItem = items.find(item => item.name === req.params.name)
        if (foundItem === undefined) {
            throw new ExpressError("Item not found", 404)
        }
        foundItem.name = req.body.name;
        foundItem.price = req.body.price;
        res.json({ Updated: foundItem })
    } catch (e) {
        next(e);
    }

})

router.delete('/:name', function (req, res, next) {
    try {
        const foundItem = items.find(item => item.name === req.params.name)
        if (foundItem === undefined) {
            throw new ExpressError("Item not found", 404)
        }
        items.splice(foundItem, 1);
        res.json({ message: "Deleted" })
    } catch (e) {
        next(e);
    }
})

module.exports = router;