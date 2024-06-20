let url = 'http://numbersapi.com/'

let $ul = $('ul')


// Part 1: Number Facts
// Question 1:
// let numberPromise = axios.get(`${url}27?json`);

// numberPromise
//     .then(res => console.log(res.data.text))
//     .catch(err => console.log(err));

// Part 1: Number Facts
// Question 2:
// let stringOfNumbers = '1..4,27,28..30'

// let multipleNumberPromise = axios.get(`${url}${stringOfNumbers}?json`)

// multipleNumberPromise
//     .then(res => {
//         console.log(res.data)
//         let x = res.data

//         for (let i in x){{
//             let newLine = $('<li>', {
//                 text: x[i]
//             });
//             $ul.append(newLine)
//         }};
//     })
//     .catch(err => console.log(err));

// Part 1: Number Facts
// Question 3:
// Notes for this question: Types are tivia, math, date, or year

// let url2 = `${url}27?json`
// let numberPromise = axios.get(`${url2}`);

// function addToPage(res){
//     let newLine = $('<li>', {
//         text: res.data.text
//     })
//     $ul.append(newLine)
// }

// numberPromise
//     .then(res1 => {
//         addToPage(res1)
//         return axios.get(url2)
//     })
//     .then(res2 => {
//         addToPage(res2)
//         return axios.get(url2)
//     })
//     .then(res3 => {
//         addToPage(res3)
//         return axios.get(url2)
//     })
//     .then(res4 => {
//         addToPage(res4)
//     })
//     .catch(err => console.log(err));