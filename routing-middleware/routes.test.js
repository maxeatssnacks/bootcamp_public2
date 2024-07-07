process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require('./app');
let items = require('./fakeDB');
const { before } = require("node:test");

let startingItem = {
    name: 'Paper Towels',
    price: 18.99
}

beforeEach(function () {
    items.push(startingItem);
})

afterEach(function () {
    items.length = 0;
})

describe("GET /items", function () {
    test("Gets a list of items", async () => {
        const resp = await request(app).get('/items');
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual([startingItem])
    });
});

describe("POST /items", function () {
    test("Creates a new item", async () => {
        const newItem = {
            name: "Peanut Butter",
            price: 3.49
        }
        const resp = (await request(app)
            .post('/items')
            .send(newItem));
        expect(resp.statusCode).toBe(201);
        expect(resp.body).toEqual({ added: newItem })
    });
});

describe("GET /items/:name", function () {
    test("Gets a specific item", async () => {
        const resp = await request(app).get(`/items/${startingItem.name}`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual(startingItem)
    });
    test("Responds with 404 if invalid item", async () => {
        const resp = await request(app).get('/items/asdfasdfas');
        expect(resp.statusCode).toBe(404);
    });
});

describe("PATCH /items/:name", function () {
    test("Updates a single item", async function () {
        const resp = await request(app)
            .patch(`/items/${startingItem.name}`)
            .send({
                name: "Diaper",
                price: 36.99
            });
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ Updated: { name: "Diaper", price: 36.99 } })
    });
    test("Responds with 404 if invalid item", async function () {
        const resp = await request(app).patch('/items/asdfasdf');
        expect(resp.statusCode).toBe(404);
    });
});

describe("DELETE /items/:name", function () {
    test("Deletes a single item", async function () {
        const resp = await request(app).delete(`/items/${startingItem.name}`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ message: "Deleted" });
    })


    test("Responds with 404 if invalid item", async function () {
        const resp = await request(app).delete('/items/asdfasdf');
        expect(resp.statusCode).toBe(404);
    });
})