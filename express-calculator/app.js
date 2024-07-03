const express = require('express');
const ExpressError = require('./expressError');

const { calculateMean, calculateMedian, calculateMode } = require('./calculations.js');

const app = express();

// Making sure we handle JSON correctly
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/mean/:numbers?', function (req, res, next) {
    // This turns a string into an array of strings
    try {

        if (!req.params.numbers) throw new ExpressError('Numbers are required', 400);

        let meanArray = req.params.numbers.split(',');

        let numbers = [];
        for (let num of meanArray) {
            if (isNaN(Number(num))) throw new ExpressError(`'${num}' is not a number`, 400);
            numbers.push(Number(num));
        }

        let mean = calculateMean(numbers);

        // Make sure the data being returned is correctly formatted
        let data = {
            type: 'mean',
            mean: mean
        }
        return res.send(data)
    } catch (e) {
        next(e);
    }

})

app.get('/median/:numbers?', function (req, res, next) {
    try {
        // Check to see if numbers are actually sent
        if (!req.params.numbers) throw new ExpressError('Numbers are required', 400);

        let medianArray = req.params.numbers.split(',');

        let numbers = [];
        for (let num of medianArray) {
            if (isNaN(Number(num))) throw new ExpressError(`'${num}' is not a number`, 400);
            numbers.push(Number(num));
        }

        let median = calculateMedian(numbers);

        let data = {
            type: 'median',
            median: median
        }

        return res.send(data)
    } catch (e) {
        next(e);
    }
})

app.get('/mode/:numbers?', function (req, res, next) {
    try {
        // Check to see if numbers are actually sent
        if (!req.params.numbers) throw new ExpressError('Numbers are required', 400);

        let modeArray = req.params.numbers.split(',');

        let numbers = [];
        for (let num of modeArray) {
            if (isNaN(Number(num))) throw new ExpressError(`'${num}' is not a number`, 400);
            numbers.push(Number(num));
        }

        let mode = calculateMode(numbers);

        let data = {
            type: 'mode',
            mode: mode
        }

        return res.send(data);
    } catch (e) {
        next(e);
    }

})

app.use(function (err, req, res, next) {
    // Log the error for server-side debugging
    console.error(err.stack);

    // Send error message to client
    res.status(err.status || 500).json({
        error: {
            message: err.message,
            status: err.status
        }
    });
});

// Listener that must run at the very end
app.listen(3000, function () {
    console.log('App on port 3000');
})

module.exports = app;
