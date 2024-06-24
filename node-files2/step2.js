const fs = require('fs');
const process = require('process');
const axios = require('axios');

function isValidURL(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

function cat(path) {
    fs.readFile(path, 'utf8', function (err, data) {
        if (err) {
            console.error(err)
            process.exit(1)
        }
        console.log(data)
    })
};

async function webCat(url) {
    try {
        let response = await axios.get(url);
        console.log(response.data);
    } catch (err) {
        console.log(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }
}

let path = process.argv[2];

if (isValidURL(path)) {
    webCat(path);
} else {
    cat(path)
}