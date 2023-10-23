// extractValue
function extractValue(arr, key){
    arr.reduce(function(names, currentName){
        names.push(currentName[key]);
        return names;
    }, [])
}

// vowelCount
function vowelCount(str){
    const vowels = 'aeiou';
    return str.split('').reduce(function(vowelCount, nextLetter){
        let lowerCase = nextLetter.toLowerCase();
        if(vowels.indexOf(lowerCase) !== -1){
            if(vowelCount[lowerCase]){
                vowelCount[lowerCase]++;
            } else {
                vowelCount[lowerCase] = 1;
            }
        }
        return vowelCount;
    }, {})
}

// addKeyAndValue
function addKeyAndValue(arr, key, value){
    return arr.reduce(function(newArr, next, idx){
        newArr[idx][key] = value;
        return newArr;
    }, arr)

}

// partition
function partition(arr, callback){
    return arr.reduce(function(acc, next){
        if (callback(next)){
            acc[0].push(next);
        } else {
            acc[1].push(next);
        }
        return acc;
    }, [[],[]]);
}