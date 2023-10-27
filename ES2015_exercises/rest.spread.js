// function filterOutOdds() {
//     var nums = Array.prototype.slice.call(arguments);
//     return nums.filter(function(num){
//         return num % 2 === 0
//     });
// }

const filterOutOdds = (...vals) => vals.filter(num => num % 2 === 0)

// findMin
const findMin = (...vals) => Math.min(...vals)

// mergeObjects
const mergeObjects = (obj1, obj2) => {
    return {...obj1, ...obj2}
}

// doubleAndReturnArgs
const doubleAndReturnArgs = (arr, ...args) => [...arr, ...args.map(num => num *2)]


// Slice and Dice!

// function removeRandom(items)
const removeRandom = (items) => {
    let i = Math.floor(Math.random() * items.length);
    return [...items.slice(0, i), ...items.slice(i+1)];
}

// function extend(array1, array2)
const extend = (array1, array2) => [...array1, ...array2]

// function addKeyVal(obj, key, val)
const addKeyVal = (obj, key, val) => {
    return {...obj, [key]: val}
}

// function removeKey(obj, key)
const removeKey = (obj, key) => {
    ({ [key]: undefined, ...obj} = obj);
    return obj;
}

// function combine(obj1, obj2)
const combine = (obj1, obj2) => {
    return {...obj1, ...obj2};
}

// function update(obj, key, val)
const update = (obj, key, val) => {
    return {...obj, [key]: val};
}