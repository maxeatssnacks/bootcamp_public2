const express = require("express");
const ExpressError = require("../expressError");
const industriesRouter = express.Router();
const db = require("../db");

// Add an Industry
industriesRouter.post('/', async (req, res, next) => {
    try {
        const { code, industry } = req.body;
        if (!code || !industry) {
            throw new ExpressError('Please make sure that you are submitting a valid industry code and industry name', 400);
        }
        const results = await db.query('INSERT INTO industries (code, industry) VALUES ($1, $2) RETURNING code, industry', [code, industry]);
        return res.status(201).json({ industry: results.rows[0] });
    } catch (err) {
        if (err.code === '23505') { // unique_violation error code
            return next(new ExpressError('An industry with this code or name already exists', 400));
        }
        next(err);
    }
});

// List all industries, showing all the company codes for that industry
industriesRouter.get('/', async (req, res, next) => {
    try {
        const results = await db.query(`
            SELECT i.code, i.industry, 
                   ARRAY_AGG(ci.comp_code) FILTER (WHERE ci.comp_code IS NOT NULL) AS company_codes
            FROM industries AS i
            LEFT JOIN company_industries AS ci ON i.code = ci.ind_code
            GROUP BY i.code, i.industry
            ORDER BY i.industry
        `);

        const industries = results.rows.map(row => ({
            code: row.code,
            industry: row.industry,
            company_codes: row.company_codes || []
        }));

        return res.json({ industries });
    } catch (err) {
        next(err);
    }
});

industriesRouter.post('/company', async (req, res, next) => {
    try {
        const { ind_code, comp_code } = req.body;
        if (!ind_code || !comp_code) {
            throw new ExpressError('Please provide both a valid Industry Code and Company Code', 400);
        }

        // Check if the industry and company exist
        const industryCheck = await db.query('SELECT code FROM industries WHERE code = $1', [ind_code]);
        const companyCheck = await db.query('SELECT code FROM companies WHERE code = $1', [comp_code]);

        if (industryCheck.rows.length === 0) {
            throw new ExpressError(`Industry with code ${ind_code} does not exist`, 404);
        }
        if (companyCheck.rows.length === 0) {
            throw new ExpressError(`Company with code ${comp_code} does not exist`, 404);
        }

        // Check if the association already exists
        const existingAssociation = await db.query(
            'SELECT * FROM company_industries WHERE comp_code = $1 AND ind_code = $2',
            [comp_code, ind_code]
        );

        if (existingAssociation.rows.length > 0) {
            throw new ExpressError('This company is already associated with this industry', 400);
        }

        const results = await db.query(
            'INSERT INTO company_industries (comp_code, ind_code) VALUES ($1, $2) RETURNING comp_code, ind_code',
            [comp_code, ind_code]
        );

        return res.status(201).json({ company_industry: results.rows[0] });
    } catch (err) {
        next(err);
    }
});

module.exports = industriesRouter;