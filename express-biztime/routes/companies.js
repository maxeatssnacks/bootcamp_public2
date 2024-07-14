const express = require("express");
const ExpressError = require("../expressError");
const companiesRouter = express.Router();
const db = require("../db");

companiesRouter.get('/', async (req, res, next) => {
    try {
        const results = await db.query('SELECT * FROM companies')
        return res.json({ companies: results.rows });
    } catch (err) {
        next(err);
    }
})

companiesRouter.get('/:code', async (req, res, next) => {
    try {
        const { code } = req.params;
        if (code.length === 0) {
            throw new ExpressError('Please make sure to include a code', 400);
        }
        const results = await db.query(`SELECT * FROM companies WHERE code=$1`, [code])
        if (results.rows.length === 0) {
            throw new ExpressError(`No company found with code ${code}`, 404);
        } else {
            return res.json({ company: results.rows[0] });
        }
    } catch (err) {
        next(err);
    }
})

companiesRouter.post('/', async (req, res, next) => {
    try {
        const { code, name, description } = req.body;
        if (!code || !name) {
            throw new ExpressError('Code and name are required', 400);
        }
        const results = await db.query('INSERT INTO companies (code, name, description) VALUES ($1, $2, $3) RETURNING id, code, name, description', [code, name, description]);
        return res.status(201).json({ company: results.rows[0] });
    } catch (err) {
        return next(err);
    }
})

companiesRouter.patch('/:code', async (req, res, next) => {
    try {
        const { code } = req.params;
        if (code.length === 0) {
            throw new ExpressError('Please make sure to include a code', 400);
        }
        const { name, description } = req.body;
        const results = await db.query('UPDATE companies SET name=$1, description=$2 WHERE code=$3 RETURNING id, code, name, description', [name, description, code]);
        if (results.rows.length === 0) {
            throw new ExpressError(`No company found with code ${code}`, 404);
        }
        return res.json({ company: results.rows[0] });
    } catch (err) {
        return next(err);
    }
})

companiesRouter.delete('/:code', async (req, res, next) => {
    try {
        const { code } = req.params;
        if (code.length === 0) {
            throw new ExpressError('Please make sure to include a code', 400);
        }
        const result = await db.query('DELETE FROM companies WHERE code = $1 RETURNING *', [code])
        if (result.rows.length === 0) {
            throw new ExpressError(`No company found with code ${code}`, 404);
        }
        return res.json({ status: "Deleted" });
    } catch (err) {
        return next(err);
    }
})

module.exports = companiesRouter;