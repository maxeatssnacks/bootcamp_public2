/** Textual markov chain generator */

class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO

    let markovChain = {}
    for (let i = 0; i < this.words.length; i++) {
      let currentWord = this.words[i];
      let nextWord = i === this.words.length - 1 ? "null" : this.words[i + 1];

      if (currentWord in markovChain) {
        markovChain[currentWord].push(nextWord);
      } else {
        markovChain[currentWord] = [nextWord];
      }
    }

    this.markovChain = markovChain;
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO

    let words = Object.keys(this.markovChain);
    let result = [];
    let isEndOfSentence = true;  // Track if we're at the start of a new sentence

    while (result.length < numWords) {
      let currentWord;

      if (isEndOfSentence || !this.markovChain[result[result.length - 1]]) {
        // Choose a random word to start a sentence or if we hit a dead end
        currentWord = words[Math.floor(Math.random() * words.length)];
        // Capitalize the first letter of the sentence
        currentWord = currentWord.charAt(0).toUpperCase() + currentWord.slice(1);
        isEndOfSentence = false;
      } else {
        // Choose next word based on the Markov chain
        let possibleNextWords = this.markovChain[result[result.length - 1]];
        currentWord = possibleNextWords[Math.floor(Math.random() * possibleNextWords.length)];
      }

      if (currentWord === "null") {
        // End the sentence with a period
        if (result.length > 0) {
          result[result.length - 1] += '.';
        }
        isEndOfSentence = true;
        continue;
      }

      result.push(currentWord);

      // Randomly end sentences (about 20% chance)
      if (Math.random() < 0.2) {
        result[result.length - 1] += '.';
        isEndOfSentence = true;
      }
    }

    // Ensure the text ends with a period
    if (!result[result.length - 1].endsWith('.')) {
      result[result.length - 1] += '.';
    }

    return result.join(' ');
  }
}

module.exports = MarkovMachine