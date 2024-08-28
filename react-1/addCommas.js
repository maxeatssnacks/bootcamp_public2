function addCommas(num) {

    let [integerString, decimalString] = num.toString().split('.');
    let isPositive = true;
    let finalIntegerString = '';

    if (integerString[0] === '-') {
        isPositive = false;
        integerString = integerString.slice(1);
    }

    integerString = integerString.split('').reverse().join('');


    for (let i = 0; i < integerString.length; i++) {
        finalIntegerString += integerString[i]
        if ((i + 1) % 3 === 0 && i !== integerString.length - 1) {
            finalIntegerString += ",";
        }
    }

    finalIntegerString = finalIntegerString.split('').reverse().join('');

    if (!isPositive) {
        finalIntegerString = '-' + finalIntegerString;
    }

    return decimalString ? `${finalIntegerString}.${decimalString}` : finalIntegerString;

}

// module.exports = addCommas;