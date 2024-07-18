const request = require('supertest');
const app = require('../app');
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


describe("POST /industries", function () {
    test("Creates a new industry", async function () {
        const response = await request(app)
            .post('/industries')
            .send({
                code: 'new',
                industry: 'New Industry'
            });
        expect(response.statusCode).toEqual(201);
        expect(response.body).toEqual({
            industry: {
                code: 'new',
                industry: 'New Industry'
            }
        });
    });

    test("Responds with 400 if industry code or name is missing", async function () {
        const response = await request(app)
            .post('/industries')
            .send({
                code: 'new'
            });
        expect(response.statusCode).toEqual(400);
    });

    test("Responds with 400 if industry already exists", async function () {
        const response = await request(app)
            .post('/industries')
            .send({
                code: 'test',
                industry: 'Test Industry'
            });
        expect(response.statusCode).toEqual(400);
    });
});

describe("GET /industries", function () {
    test("Gets a list of industries with company codes", async function () {
        const response = await request(app).get('/industries');
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({
            industries: [{
                code: testIndustry.code,
                industry: testIndustry.industry,
                company_codes: [testCompany.code]
            }]
        });
    });
});

describe("POST /industries/company", function () {
    test("Associates a company with an industry", async function () {
        await db.query("DELETE FROM company_industries");
        const response = await request(app)
            .post('/industries/company')
            .send({
                ind_code: testIndustry.code,
                comp_code: testCompany.code
            });
        expect(response.statusCode).toEqual(201);
    });

    test("Responds with 400 if industry code or company code is missing", async function () {
        const response = await request(app)
            .post('/industries/company')
            .send({
                ind_code: testIndustry.code
            });
        expect(response.statusCode).toEqual(400);
    });

    test("Responds with 404 if industry does not exist", async function () {
        const response = await request(app)
            .post('/industries/company')
            .send({
                ind_code: 'nonexistent',
                comp_code: testCompany.code
            });
        expect(response.statusCode).toEqual(404);
    });

    test("Responds with 404 if company does not exist", async function () {
        const response = await request(app)
            .post('/industries/company')
            .send({
                ind_code: testIndustry.code,
                comp_code: 'nonexistent'
            });
        expect(response.statusCode).toEqual(404);
    });

    test("Responds with 400 if association already exists", async function () {
        // First, create the association
        await request(app)
            .post('/industries/company')
            .send({
                ind_code: testIndustry.code,
                comp_code: testCompany.code
            });

        // Then, try to create it again
        const response = await request(app)
            .post('/industries/company')
            .send({
                ind_code: testIndustry.code,
                comp_code: testCompany.code
            });
        expect(response.statusCode).toEqual(400);
    });
});