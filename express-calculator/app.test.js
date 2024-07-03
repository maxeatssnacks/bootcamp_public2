const request = require('supertest');
const app = require('./app');

describe('Calculator API', () => {
    describe('GET /mean', () => {
        test('calculates the mean correctly', async () => {
            const response = await request(app).get('/mean/1,2,3,4,5');
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({
                type: 'mean',
                mean: 3
            });
        });

        test('handles empty params', async () => {
            const response = await request(app).get('/mean');
            expect(response.statusCode).toBe(400);
            expect(response.body.error.message).toBe('Numbers are required');
        });

        test('handles invalid params', async () => {
            const response = await request(app).get('/mean/1,2,3,foo,5');
            expect(response.statusCode).toBe(400);
            expect(response.body.error.message).toBe("'foo' is not a number");
        });
    });

    describe('GET /median', () => {
        test('calculates the median correctly', async () => {
            const response = await request(app).get('/median/1,2,3,4,5');
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({
                type: 'median',
                median: 3
            });
        });

        test('handles empty params', async () => {
            const response = await request(app).get('/median');
            expect(response.statusCode).toBe(400);
            expect(response.body.error.message).toBe('Numbers are required');
        });

        test('handles invalid params', async () => {
            const response = await request(app).get('/median/1,2,3,bar,5');
            expect(response.statusCode).toBe(400);
            expect(response.body.error.message).toBe("'bar' is not a number");
        });
    });

    describe('GET /mode', () => {
        test('calculates the mode correctly', async () => {
            const response = await request(app).get('/mode/1,2,2,3,4,5');
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({
                type: 'mode',
                mode: [2]
            });
        });

        test('handles empty params', async () => {
            const response = await request(app).get('/mode');
            expect(response.statusCode).toBe(400);
            expect(response.body.error.message).toBe('Numbers are required');
        });

        test('handles invalid params', async () => {
            const response = await request(app).get('/mode/1,2,3,baz,5');
            expect(response.statusCode).toBe(400);
            expect(response.body.error.message).toBe("'baz' is not a number");
        });
    });
});