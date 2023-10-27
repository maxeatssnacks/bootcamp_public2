// #1
// {1, 2, 3, 4}

// #2
// 'ref'

// #3
// m = [
//     [[1, 2, 3], true],
//     [[1, 2, 3], false]
// ]

// hasDuplicate
let hasDuplicate = (arr) => {
    if ([...new Set(arr)].length === arr.length){
        return false
    } return true
}

// vowelCount
function isVowel(char){
    return "aeiou".includes(char);
}

function vowelCount(str){
    const vowels = newMap();
    for (let char of str){
        let lowerCaseChar = char.toLowerCase();
        if(isVowel(lowerCaseChar)){
            if(vowels.has(lowerCaseChar)){
                vowels.set(lowerCaseChar, vowels.get(lowerCaseChar) + 1);
            } else {
                vowels.set(lowerCaseChar, 1);
            }
        }
    }
    return vowels;
}