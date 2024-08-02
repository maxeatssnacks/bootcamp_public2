const { sqlForPartialUpdate } = require("./sql");
const { BadRequestError } = require("../expressError");

describe("sqlForPartialUpdate", function () {
    test("works: valid input", () => {
        const dataToUpdate = { firstName: 'Aliya', age: 32 };
        const jsToSql = { firstName: "first_name" };
        const result = sqlForPartialUpdate(dataToUpdate, jsToSql);
        expect(result).toEqual({
            setCols: '"first_name"=$1, "age"=$2',
            values: ['Aliya', 32]
        });
    });

    test("works: some fields not in jsToSql", () => {
        const dataToUpdate = { firstName: 'Aliya', age: 32 };
        const jsToSql = { firstName: "first_name" };
        const result = sqlForPartialUpdate(dataToUpdate, jsToSql);
        expect(result).toEqual({
            setCols: '"first_name"=$1, "age"=$2',
            values: ['Aliya', 32]
        });
    });

    test("throws error if dataToUpdate is empty", () => {
        const dataToUpdate = {};
        const jsToSql = { firstName: "first_name" };
        expect(() => {
            sqlForPartialUpdate(dataToUpdate, jsToSql);
        }).toThrow(BadRequestError);
        expect(() => {
            sqlForPartialUpdate(dataToUpdate, jsToSql);
        }).toThrow("No data");
    });
});