// #1
// 8
// 1846

// #2
// {yearNeptuneDiscovered: 1846, yearMarsDiscovered: 1659}

// #3
// Your name is Alejandro and you like purple
// Your name is Melissa and you like green
// Your name is undefined and you like green

// #4
// Maya
// Marisa
// Chi

// #5
// Raindrops on roses
// whiskers on kittens
// ["Bright copper kettles", "warm woolen mittens", "Brown paper packages tied up with strings"]

// #6
// [10, 30, 20]

// var obj = {
//     numbers: {
//         a: 1,
//         b: 2
//     }
// };

// var a = obj.numbers.a;
// var b = obj.numbers.b;

let obj = {
    numbers: {
        a:1,
        b:2
    }
};

let {numbers: {a, b}} = obj;

// var arr = [1, 2];
// var temp = arr[0];
// arr[0] = arr[1];
// arr[1] = temp;

let arr = [1, 2];
[a , b] = arr;
[a , b] = [b , a];

// raceResults()

let raceResults = ([first, second, third, ...rest]) => ({first, second, third, rest});