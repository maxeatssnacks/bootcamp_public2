const request = require("supertest");
const app = require("../app");
const db = require("../db");

const validBook = {
    isbn: "0691161518",
    amazon_url: "http://a.co/eobPtX2",
    author: "Matthew Lane",
    language: "english",
    pages: 264,
    publisher: "Princeton University Press",
    title: "Power-Up: Unlocking Hidden Mathematics in Video Games",
    year: 2017
};

beforeEach(async () => {
    await db.query("DELETE FROM books");
});

afterAll(async () => {
    await db.end();
});

describe("Book Routes", () => {
    describe("GET /books", () => {
        test("should return an empty list initially", async () => {
            const response = await request(app).get("/books");
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({ books: [] });
        });
    });

    describe("POST /books", () => {
        test("should create a new book with valid data", async () => {
            const response = await request(app)
                .post("/books")
                .send(validBook);
            expect(response.statusCode).toBe(201);
            expect(response.body.book).toEqual(validBook);
        });

        test("should fail with invalid data (missing required field)", async () => {
            const invalidBook = { ...validBook };
            delete invalidBook.isbn;
            const response = await request(app)
                .post("/books")
                .send(invalidBook);
            expect(response.statusCode).toBe(400);
            expect(response.body.error).toBeDefined();
        });

        test("should fail with invalid data type (year as string)", async () => {
            const invalidBook = { ...validBook, year: "2017" };
            const response = await request(app)
                .post("/books")
                .send(invalidBook);
            expect(response.statusCode).toBe(400);
            expect(response.body.error).toBeDefined();
        });
    });

    describe("GET /books/:isbn", () => {
        test("should return a book by ISBN", async () => {
            await request(app).post("/books").send(validBook);
            const response = await request(app).get(`/books/${validBook.isbn}`);
            expect(response.statusCode).toBe(200);
            expect(response.body.book).toEqual(validBook);
        });

        test("should return 404 for non-existent ISBN", async () => {
            const response = await request(app).get("/books/nonexistentisbn");
            expect(response.statusCode).toBe(404);
        });
    });

    describe("PUT /books/:isbn", () => {
        test("should update a book with valid data", async () => {
            await request(app).post("/books").send(validBook);
            const updatedBook = { ...validBook, title: "Updated Title" };
            const response = await request(app)
                .put(`/books/${validBook.isbn}`)
                .send(updatedBook);
            expect(response.statusCode).toBe(200);
            expect(response.body.book).toEqual(updatedBook);
        });

        test("should fail with invalid data (negative pages)", async () => {
            await request(app).post("/books").send(validBook);
            const invalidUpdate = { ...validBook, pages: -10 };
            const response = await request(app)
                .put(`/books/${validBook.isbn}`)
                .send(invalidUpdate);
            expect(response.statusCode).toBe(400);
            expect(response.body.error).toBeDefined();
        });
    });

    describe("DELETE /books/:isbn", () => {
        test("should delete a book", async () => {
            await request(app).post("/books").send(validBook);
            const response = await request(app).delete(`/books/${validBook.isbn}`);
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({ message: "Book deleted" });
        });

        test("should return 404 for non-existent ISBN", async () => {
            const response = await request(app).delete("/books/nonexistentisbn");
            expect(response.statusCode).toBe(404);
        });
    });
});