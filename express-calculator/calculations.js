function calculateMean(numbers) {
    let count = numbers.length;
    let sum = 0;

    // Sum the array of strings by turning them into numbers
    for (let num of numbers) {
        sum += num;
    }

    // Calculate mean
    let mean = sum / count;

    return mean;
}

function calculateMedian(numbers) {
    let count = numbers.length;
    let median;

    // Taking into account even vs odd length arrays
    if (count % 2 !== 0) {
        median = numbers[(count / 2 - 0.5)];
    } else {
        let number1 = numbers[count / 2 - 1];
        let number2 = numbers[count / 2];
        median = (number1 + number2) / 2;
    }

    return median;
}

function calculateMode(numbers) {
    // Count occurrences of each number
    const countMap = {};
    for (let num of numbers) {
        countMap[num] = (countMap[num] || 0) + 1;
    }

    // Find the highest frequency
    let maxFrequency = 0;
    for (let count of Object.values(countMap)) {
        if (count > maxFrequency) {
            maxFrequency = count;
        }
    }

    // Find all numbers with the highest frequency
    const mode = [];
    for (let [num, count] of Object.entries(countMap)) {
        if (count === maxFrequency) {
            mode.push(Number(num));
        }
    }

    return mode;
}

module.exports = {
    calculateMean,
    calculateMedian,
    calculateMode
};