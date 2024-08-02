"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for jobs. */

class Jobs {
    /** Create a job (from data), update db, return new job data.
     *
     * data should be { title, salary, equity, company_handle}
     *
     * Returns { id, title, salary, equity, company_handle }
     *
     * Throws BadRequestError if company already in database.
     * */

    static async create({ title, salary, equity, company_handle }) {
        this._validateEquity(equity);

        const duplicateCheck = await db.query(`
            SELECT title, company_handle
            FROM jobs
            WHERE company_handle = $1 AND title = $2`,
            [company_handle, title]);

        if (duplicateCheck.rows[0]) {
            throw new BadRequestError(`Duplicate job listing "${title}" for ${company_handle}`);
        }

        const result = await db.query(`
            INSERT INTO jobs (title, salary, equity, company_handle)
            VALUES ($1, $2, $3, $4)
            RETURNING id, title, salary, equity, company_handle`,
            [title, salary, equity, company_handle]);

        const company = result.rows[0];
        return company;
    }

    /** Find all jobs.
     *
     * Returns [{ id, title, salary, equity, company_handle }, ...]
     * */

    static async findAll(filters = {}) {
        let query = `SELECT id,
                            title,
                            salary,
                            equity,
                            company_handle
                     FROM jobs`;

        let whereExpressions = [];
        let queryValues = [];

        const { title, minSalary, hasEquity } = filters;

        if (minSalary !== undefined) {
            if (minSalary <= 0) {
                throw new BadRequestError("Minimum salary must be a positive number");
            }
            queryValues.push(minSalary);
            whereExpressions.push(`salary >= $${queryValues.length}`);
        }

        if (title) {
            queryValues.push(`%${title}%`);
            whereExpressions.push(`title ILIKE $${queryValues.length}`);
        }

        if (hasEquity === true) {
            whereExpressions.push(`equity > 0`);
        }

        if (whereExpressions.length > 0) {
            query += " WHERE " + whereExpressions.join(" AND ");
        }

        query += " ORDER BY title";

        const jobsResults = await db.query(query, queryValues);
        return jobsResults.rows;
    }

    /** Given a jobId, return job associated with that id.
     *
     * Returns { id, title, salary, equity, company_handle }
     *
     * Throws NotFoundError if not found.
     **/

    static async get(jobId) {
        const jobRes = await db.query(`
            SELECT id, title, salary, equity, company_handle
            FROM jobs
            WHERE id = $1`,
            [jobId]);

        const job = jobRes.rows[0];

        if (!job) throw new NotFoundError(`No job with job ID of ${jobId}`);

        return job;
    }

    /** Update job data with `data`.
     *
     * This is a "partial update" --- it's fine if data doesn't contain all the
     * fields; this only changes provided ones.
     *
     * Data can include: {title, salary, equity}
     *
     * Returns {id, title, salary, equity, company_handle}
     *
     * Throws NotFoundError if not found.
     */

    static async update(id, data) {
        if (data.company_handle !== undefined) {
            throw new BadRequestError("Cannot update company_handle");
        }

        if (data.equity !== undefined) {
            this._validateEquity(data.equity);
        }

        const { setCols, values } = sqlForPartialUpdate(
            data,
            {
                title: "title",
                salary: "salary",
                equity: "equity"
            });
        const idVarIdx = "$" + (values.length + 1);

        const querySql = `UPDATE jobs 
                          SET ${setCols} 
                          WHERE id = ${idVarIdx} 
                          RETURNING id, 
                                    title, 
                                    salary, 
                                    equity, 
                                    company_handle`;
        const result = await db.query(querySql, [...values, id]);
        const job = result.rows[0];

        if (!job) throw new NotFoundError(`No job: ${id}`);

        return job;
    }

    /** Delete given job from database; returns undefined.
     *
     * Throws NotFoundError if job not found.
     **/

    static async remove(id) {
        const result = await db.query(`
            DELETE FROM jobs
            WHERE id = $1
            RETURNING id`,
            [id]);
        const job = result.rows[0];

        if (!job) throw new NotFoundError(`No job: ${id}`);
    }

    static _validateEquity(equity) {
        if (equity !== undefined) {
            const equityFloat = parseFloat(equity);
            if (isNaN(equityFloat) || equityFloat < 0 || equityFloat > 1) {
                throw new BadRequestError("Equity must be a number between 0 and 1");
            }
        }
    }
}

module.exports = Jobs;