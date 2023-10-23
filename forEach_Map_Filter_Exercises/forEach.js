
// doubleValues
function doubleValues(arr){
    let doubled = [];
    arr.forEach(function(val){
        doubled.push(val * 2);
    })
    return doubled
};

// onlyEvenValues
function onlyEvenValues(arr){
    let evens = [];
    arr.forEach(function(val){
        if (val % 2 == 0){
            evens.push(val);
        }
    })
    return evens
};

// showFirstAndLast
function showFirstAndLast(arr){
    let firstLast = [];
    arr.forEach(function(str){
        firstLast.push(str[0] + str[str.length-1]);
    })
    return firstLast
}

// addKeyAndValue
function addKeyAndValue(arr, key, value){
    arr.forEach(function(val){
        val[key] = value;
    })
    return arr
}

// vowelCount
function vowelCount(str){
    let splitArr = str.split("");
    let obj = {};
    const vowels = "aeiou";


    splitArr.forEach(function(char){
        let lowerCasedLetter = char.toLowerCase();
        if (vowels.indexOf(lowerCasedLetter) !== -1){
            if (obj[lowerCasedLetter]){
                obj[lowerCasedLetter]++;
            } else {
                obj[lowerCasedLetter] = 1;
            }
        }
    });
    return obj;
}