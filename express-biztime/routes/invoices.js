const express = require("express");
const ExpressError = require("../expressError");
const invoicesRouter = express.Router();
const db = require("../db");

invoicesRouter.get('/', async (req, res, next) => {
    try {
        const results = await db.query('SELECT * FROM invoices')
        return res.json({ invoices: results.rows });
    } catch (err) {
        return next(err);
    }
})

invoicesRouter.get('/:id', async (req, res, next) => {
    try {
        const { id } = parseInt(req.params);
        if (!id === 0) {
            throw new ExpressError('Please make sure to include a id', 400);
        }
        const results = await db.query(`SELECT * FROM invoices WHERE id=$1`, [id])
        if (results.rows.length === 0) {
            throw new ExpressError(`No invoice found with an id of ${id}`, 404);
        }
        return res.json({ invoice: results.rows[0] });
    } catch (err) {
        return next(err);
    }
})

invoicesRouter.post('/', async (req, res, next) => {
    try {
        const { comp_code } = req.body;
        const { amt } = parseFloat(req.body);
        if (!comp_code || !amt) {
            throw new ExpressError('Company Code and Amount are required', 400);
        }

        if (isNaN(amt)) {
            throw new ExpressError('Please make sure to include a valid amount', 400);
        }
        const results = await db.query('INSERT INTO invoices (comp_code, amt) VALUES ($1, $2) RETURNING id, comp_code, amt, add_date, paid_date', [comp_code, amt]);
        return res.status(201).json({ invoice: results.rows[0] });
    } catch (err) {
        return next(err);
    }
})

invoicesRouter.patch('/:id', async (req, res, next) => {
    try {
        // Checks if there actually is an invoice matching the id
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            throw new ExpressError('Please provide a valid invoice ID', 400);
        }

        // Get the current invoice data
        const result = await db.query('SELECT * FROM invoices WHERE id=$1', [id]);
        if (result.rows.length === 0) {
            throw new ExpressError(`No invoice found with id ${id}`, 404);
        }
        const invoice = result.rows[0];

        // Get the amount paid from the request body
        const amt_paid = req.body.amt;
        if (typeof amt_paid !== 'number' || isNaN(amt_paid)) {
            throw new ExpressError('Please provide a valid amount paid', 400);
        }

        // Calculate new values
        const new_amt = invoice.amt - amt_paid;
        const new_paid = new_amt <= 0 ? 'True' : null;
        const new_paid_date = new_paid === 'True' ? new Date() : null;

        // Update the invoice
        const updateResult = await db.query(
            'UPDATE invoices SET amt=$1, paid=$2, paid_date=$3 WHERE id=$4 RETURNING id, comp_code, amt, paid, add_date, paid_date',
            [new_amt, new_paid, new_paid_date, id]
        );

        return res.json({ invoice: updateResult.rows[0] });
    } catch (err) {
        return next(err);
    }
});

invoicesRouter.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id === 0) {
            throw new ExpressError('Please make sure to include a id', 400);
        }
        const result = await db.query('DELETE FROM invoices WHERE id = $1 RETURNING *', [id])
        if (result.rows.length === 0) {
            throw new ExpressError(`No invoice found with an id of ${id}`, 404);
        }
        return res.json({ status: "Deleted" });
    } catch (err) {
        return next(err);
    }
})

invoicesRouter.get('/companies/:code', async (req, res, next) => {
    try {
        const { code } = req.params;
        if (!code) {
            throw new ExpressError('Please make sure to include a code', 400);
        }

        const company = await db.query('SELECT * FROM companies WHERE code=$1', [code])
        if (company.rows.length === 0) {
            throw new ExpressError(`No company found with code ${code}`, 404);
        }

        const invoices = await db.query('SELECT * FROM invoices WHERE comp_code = $1', [code])
        return res.json({ company: company.rows[0], invoices: invoices.rows })
    } catch (err) {
        return next(err);
    }
})

module.exports = invoicesRouter;