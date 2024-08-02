"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/sql");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");

/** Related functions for users. */

class User {
  /** authenticate user with username, password.
   *
   * Returns { username, first_name, last_name, email, is_admin, jobs }
   *
   * Throws UnauthorizedError is user not found or wrong password.
   **/

  static async authenticate(username, password) {
    // try to find the user first
    const result = await db.query(
      `SELECT username,
                  password,
                  first_name AS "firstName",
                  last_name AS "lastName",
                  email,
                  is_admin AS "isAdmin"
           FROM users
           WHERE username = $1`,
      [username],
    );

    const user = result.rows[0];

    if (user) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        delete user.password;
        user.jobs = await this.getAppliedJobs(username);
        return user;
      }
    }

    throw new UnauthorizedError("Invalid username/password");
  }

  /** Register user with data.
   *
   * Returns { username, firstName, lastName, email, isAdmin, jobs }
   *
   * Throws BadRequestError on duplicates.
   **/

  static async register(
    { username, password, firstName, lastName, email, isAdmin }) {
    const duplicateCheck = await db.query(
      `SELECT username
           FROM users
           WHERE username = $1`,
      [username],
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Duplicate username: ${username}`);
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
      `INSERT INTO users
           (username,
            password,
            first_name,
            last_name,
            email,
            is_admin)
           VALUES ($1, $2, $3, $4, $5, $6)
           RETURNING username, first_name AS "firstName", last_name AS "lastName", email, is_admin AS "isAdmin"`,
      [
        username,
        hashedPassword,
        firstName,
        lastName,
        email,
        isAdmin,
      ],
    );

    const user = result.rows[0];
    user.jobs = [];

    return user;
  }

  /** Find all users.
   *
   * Returns [{ username, first_name, last_name, email, is_admin, jobs }, ...]
   **/

  static async findAll() {
    const result = await db.query(
      `SELECT username,
                  first_name AS "firstName",
                  last_name AS "lastName",
                  email,
                  is_admin AS "isAdmin"
           FROM users
           ORDER BY username`,
    );

    for (let user of result.rows) {
      user.jobs = await this.getAppliedJobs(user.username);
    }

    return result.rows;
  }

  /** Given a username, return data about user.
   *
   * Returns { username, first_name, last_name, is_admin, jobs }
   *   where jobs is { id, title, company_handle, company_name, state }
   *
   * Throws NotFoundError if user not found.
   **/

  static async get(username) {
    const userRes = await db.query(
      `SELECT username,
              first_name AS "firstName",
              last_name AS "lastName",
              email,
              is_admin AS "isAdmin"
       FROM users
       WHERE username = $1`,
      [username],
    );

    const user = userRes.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);

    user.jobs = await this.getAppliedJobs(username);

    return user;
  }

  /** Update user data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Data can include:
   *   { firstName, lastName, password, email, isAdmin }
   *
   * Returns { username, firstName, lastName, email, isAdmin, jobs }
   *
   * Throws NotFoundError if not found.
   *
   * WARNING: this function can set a new password or make a user an admin.
   * Callers of this function must be certain they have validated inputs to this
   * or a serious security risks are opened.
   */

  static async update(username, data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
    }

    const { setCols, values } = sqlForPartialUpdate(
      data,
      {
        firstName: "first_name",
        lastName: "last_name",
        isAdmin: "is_admin",
      });
    const usernameVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE users 
                      SET ${setCols} 
                      WHERE username = ${usernameVarIdx} 
                      RETURNING username,
                                first_name AS "firstName",
                                last_name AS "lastName",
                                email,
                                is_admin AS "isAdmin"`;
    const result = await db.query(querySql, [...values, username]);
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);

    delete user.password;
    user.jobs = await this.getAppliedJobs(username);
    return user;
  }

  /** Delete given user from database; returns undefined. */

  static async remove(username) {
    let result = await db.query(
      `DELETE
           FROM users
           WHERE username = $1
           RETURNING username`,
      [username],
    );
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);
  }

  /** Apply for a job
     * 
     * Returns { username, jobId }
     * 
     * Throws BadRequestError if application already exists.
     * Throws NotFoundError if user or job not found.
     */
  static async applyToJob(username, jobId) {
    const checkUser = await db.query(
      `SELECT username FROM users WHERE username = $1`, [username]);
    if (checkUser.rows.length === 0) {
      throw new NotFoundError(`User not found: ${username}`);
    }

    const checkJob = await db.query(
      `SELECT id FROM jobs WHERE id = $1`, [jobId]);
    if (checkJob.rows.length === 0) {
      throw new NotFoundError(`Job not found: ${jobId}`);
    }

    const checkApplication = await db.query(
      `SELECT * FROM applications
     WHERE username = $1 AND job_id = $2`,
      [username, jobId]);

    if (checkApplication.rows[0]) {
      throw new BadRequestError(`Already applied to job: ${jobId}`);
    }

    await db.query(
      `INSERT INTO applications (username, job_id)
     VALUES ($1, $2)`,
      [username, jobId]);

    return { username, jobId };
  }

  /** Get jobs that user has applied to
   * 
   * Returns [jobId, ...]
   * 
   * Throws NotFoundError if user not found.
   */
  static async getAppliedJobs(username) {
    const checkUser = await db.query(
      `SELECT username FROM users WHERE username = $1`, [username]);
    if (checkUser.rows.length === 0) {
      throw new NotFoundError(`User not found: ${username}`);
    }

    const result = await db.query(
      `SELECT j.id
       FROM applications AS a
       JOIN jobs AS j ON a.job_id = j.id
       WHERE a.username = $1`,
      [username]);

    return result.rows.map(row => row.id);
  }

  static async getUserJobs(username) {
    const userCheck = await db.query(
      `SELECT username FROM users WHERE username = $1`, [username]);
    if (userCheck.rows.length === 0) {
      throw new NotFoundError(`No user: ${username}`);
    }

    const result = await db.query(
      `SELECT j.id
       FROM applications AS a
       JOIN jobs AS j ON a.job_id = j.id
       WHERE a.username = $1`,
      [username]);

    return result.rows.map(row => row.id);
  }

}

module.exports = User;