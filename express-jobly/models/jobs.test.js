"use strict";

const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError");
const Job = require("./jobs.js");
const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    testJobIds
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** create */

describe("create", function () {
    const newJob = {
        title: "New",
        salary: 100000,
        equity: "0.1",
        company_handle: "c1",
    };

    test("works", async function () {
        let job = await Job.create(newJob);
        expect(job).toEqual({
            ...newJob,
            id: expect.any(Number),
        });

        const result = await db.query(
            `SELECT id, title, salary, equity, company_handle
           FROM jobs
           WHERE id = $1`, [job.id]);
        expect(result.rows).toEqual([
            {
                id: job.id,
                title: "New",
                salary: 100000,
                equity: "0.1",
                company_handle: "c1",
            },
        ]);
    });

    test("bad request with dupe", async function () {
        try {
            await Job.create(newJob);
            await Job.create(newJob);
            fail();
        } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy();
        }
    });
});

/************************************** findAll */

describe("findAll", function () {
    test("works: no filter", async function () {
        let jobs = await Job.findAll();
        expect(jobs).toEqual([
            {
                id: expect.any(Number),
                title: "Job1",
                salary: 100000,
                equity: "0.1",
                company_handle: "c1",
            },
            {
                id: expect.any(Number),
                title: "Job2",
                salary: 200000,
                equity: "0.2",
                company_handle: "c1",
            },
            {
                id: expect.any(Number),
                title: "Job3",
                salary: 300000,
                equity: "0",
                company_handle: "c1",
            },
        ]);
    });

    test("works: by min salary", async function () {
        let jobs = await Job.findAll({ minSalary: 250000 });
        expect(jobs).toEqual([
            {
                id: expect.any(Number),
                title: "Job3",
                salary: 300000,
                equity: "0",
                company_handle: "c1",
            },
        ]);
    });

    test("works: by equity", async function () {
        let jobs = await Job.findAll({ hasEquity: true });
        expect(jobs).toEqual([
            {
                id: expect.any(Number),
                title: "Job1",
                salary: 100000,
                equity: "0.1",
                company_handle: "c1",
            },
            {
                id: expect.any(Number),
                title: "Job2",
                salary: 200000,
                equity: "0.2",
                company_handle: "c1",
            },
        ]);
    });

    test("works: by min salary & equity", async function () {
        let jobs = await Job.findAll({ minSalary: 150000, hasEquity: true });
        expect(jobs).toEqual([
            {
                id: expect.any(Number),
                title: "Job2",
                salary: 200000,
                equity: "0.2",
                company_handle: "c1",
            },
        ]);
    });

    test("works: by name", async function () {
        let jobs = await Job.findAll({ title: "ob" });
        expect(jobs).toEqual([
            {
                id: expect.any(Number),
                title: "Job1",
                salary: 100000,
                equity: "0.1",
                company_handle: "c1",
            },
            {
                id: expect.any(Number),
                title: "Job2",
                salary: 200000,
                equity: "0.2",
                company_handle: "c1",
            },
            {
                id: expect.any(Number),
                title: "Job3",
                salary: 300000,
                equity: "0",
                company_handle: "c1",
            },
        ]);
    });
});

/************************************** get */

describe("get", function () {
    test("works", async function () {
        let job = await Job.get(testJobIds[0]);
        expect(job).toEqual({
            id: testJobIds[0],
            title: "Job1",
            salary: 100000,
            equity: "0.1",
            company_handle: "c1",
        });
    });

    test("not found if no such job", async function () {
        try {
            await Job.get(0);
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });
});

/************************************** update */

describe("update", function () {
    const updateData = {
        title: "New",
        salary: 500000,
        equity: "0.5",
    };

    test("works", async function () {
        let job = await Job.update(testJobIds[0], updateData);
        expect(job).toEqual({
            id: testJobIds[0],
            company_handle: "c1",
            ...updateData,
        });

        const result = await db.query(
            `SELECT id, title, salary, equity, company_handle
           FROM jobs
           WHERE id = $1`, [testJobIds[0]]);
        expect(result.rows).toEqual([{
            id: testJobIds[0],
            title: "New",
            salary: 500000,
            equity: "0.5",
            company_handle: "c1",
        }]);
    });

    test("not found if no such job", async function () {
        try {
            await Job.update(0, updateData);
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });

    test("bad request with no data", async function () {
        try {
            await Job.update(testJobIds[0], {});
            fail();
        } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy();
        }
    });
});

/************************************** remove */

describe("remove", function () {
    test("works", async function () {
        await Job.remove(testJobIds[0]);
        const res = await db.query(
            "SELECT id FROM jobs WHERE id=$1", [testJobIds[0]]);
        expect(res.rows.length).toEqual(0);
    });

    test("not found if no such job", async function () {
        try {
            await Job.remove(0);
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });
});