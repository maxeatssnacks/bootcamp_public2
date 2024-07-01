const MarkovMachine = require("./markov");

describe("Checking the Markov Machine", function () {
    let mm;

    beforeEach(() => {
        mm = new MarkovMachine("Your sample text goes here");
    });

    test("Machine makes a string", function () {
        let output = mm.makeText(10);
        // Check if the output is a string
        expect(typeof output).toBe("string");
    })

    test("Machine makes the correct sized string", function () {
        let output = mm.makeText(10);
        // Check if the output has 10 words
        expect(output.split(' ').length).toBe(10);
    })
})