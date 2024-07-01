/** Command-line tool to generate Markov text. */

const MarkovMachine = require('./markov')
const fs = require('fs');
const axios = require('axios');

async function getUrlInfo(website) {
    try {
        const response = await axios.get(website);
        return response.data
    }
    catch {
        console.error("There was an error fetching data from that URL, please try again");
        process.exit(2);
    }
}

function getFileData(filePath) {
    try {
        let contents = fs.readFileSync(filePath, 'utf8');
        return contents;
    }
    catch {
        console.error("There was an error reading the file path, please try again!")
        process.exit(1);
    }
}

async function main() {
    let text;
    if (process.argv[2] === 'file') {
        text = getFileData(process.argv[3]);
    } else {
        text = await getUrlInfo(process.argv[3]);
    }

    let mm = new MarkovMachine(text);
    console.log('================================================================================');
    console.log(`... generated text from ${process.argv[2]} ${process.argv[3]}`);
    console.log('================================================================================');
    console.log(mm.makeText(30));
    console.log('================================================================================');

}

main().catch(err => {
    console.error("An error occurred:", err);
    process.exit(1);
});