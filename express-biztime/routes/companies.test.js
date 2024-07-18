process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app");
const db = require("../db");

beforeAll(async () => {
    await db.connect();
});

afterAll(async () => {
    await db.end();
});

let testCompany, testInvoice, testIndustry;

beforeEach(async function () {
    await db.query("DELETE FROM invoices");
    await db.query("DELETE FROM company_industries");
    await db.query("DELETE FROM companies");
    await db.query("DELETE FROM industries");

    const companyResult = await db.query(`
      INSERT INTO companies (code, name, description) 
      VALUES ('testcomp', 'Test Company', 'A company for testing')
      RETURNING code, name, description`);
    testCompany = companyResult.rows[0];

    const invoiceResult = await db.query(`
      INSERT INTO invoices (comp_code, amt) 
      VALUES ('testcomp', 100)
      RETURNING id, comp_code, amt, paid, add_date, paid_date`);
    testInvoice = invoiceResult.rows[0];

    const industryResult = await db.query(`
      INSERT INTO industries (code, industry) 
      VALUES ('test', 'Test Industry')
      RETURNING code, industry`);
    testIndustry = industryResult.rows[0];

    await db.query(`
      INSERT INTO company_industries (comp_code, ind_code)
      VALUES ('testcomp', 'test')`);
});

afterEach(async function () {
    await db.query("DELETE FROM company_industries");
    await db.query("DELETE FROM industries");
    await db.query("DELETE FROM companies");
});

describe("GET /companies/:code", function () {
    test("Gets a single company", async function () {
        const response = await request(app).get(`/companies/${testCompany.code}`);
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({
            company: { ...testCompany, industries: ['Test Industry'] }
        });
    });

    test("Responds with 404 for invalid company", async function () {
        const response = await request(app).get('/companies/invalid');
        expect(response.statusCode).toEqual(404);
    });
});

describe("POST /companies", function () {
    test("Creates a new company", async function () {
        const response = await request(app)
            .post('/companies')
            .send({
                code: 'new',
                name: 'New Company',
                description: 'A new company for testing'
            });
        expect(response.statusCode).toEqual(201);
        expect(response.body).toEqual({
            company: {
                code: 'new',
                name: 'New-Company',
                description: 'A new company for testing'
            }
        });
    });
});

describe("PATCH /companies/:code", function () {
    test("Updates a company", async function () {
        const response = await request(app)
            .patch(`/companies/${testCompany.code}`)
            .send({
                name: 'Updated Company',
                description: 'This is an updated description'
            });
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({
            company: {
                code: testCompany.code,
                name: 'Updated Company',
                description: 'This is an updated description'
            }
        });
    });

    test("Responds with 404 for invalid company", async function () {
        const response = await request(app)
            .patch('/companies/invalid')
            .send({
                name: 'Updated Company',
                description: 'This is an updated description'
            });
        expect(response.statusCode).toEqual(404);
    });
});

describe("DELETE /companies/:code", function () {
    test("Deletes a company", async function () {
        const response = await request(app).delete(`/companies/${testCompany.code}`);
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({ status: "Deleted" });
    });

    test("Responds with 404 for invalid company", async function () {
        const response = await request(app).delete('/companies/invalid');
        expect(response.statusCode).toEqual(404);
    });
});