const gameContainer = document.getElementById("game");
const startButton = document.querySelector('#startButton');
const hiScore = document.querySelector('#Hi-Score');
const h2 = document.querySelectorAll('h2');

// Need to turn RGB colors into HEX code
function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

// This generates a randomly sized array between 3 to 9 elements
// with randomly generated hexcodes as the elements
// and then doubles it because we need pairs! 
let totalPairs = Math.floor(Math.random() * 7) + 3;
let COLORS = function generateCOLORS() {
  let colorCodes = [];
  for (let i = 0; i < totalPairs; i++) {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    colorCodes[i] = componentToHex(r) + componentToHex(g) + componentToHex(b);
  }
  colorCodes = colorCodes.concat(colorCodes);
  return colorCodes;
}

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS());

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on

    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
let score = 0;
function handleCardClick(event) {
  let cards = document.querySelectorAll('#game div')
  totalCards = cards.length;
  let clickedCards = document.querySelectorAll('.clicked');
  let matchedCards = document.querySelectorAll('.matched');
  let scoring = document.querySelector('#score');
  // prevents more than 2 cards to be "clicked" at a time
  if (clickedCards.length < 2) {
    // if the card is already "clicked", you can't click it again
    if (event.target.classList.contains('clicked')) {
      alert("You've already clicked this card");
      // if the card has already been "Matched", you can't click it again
    } else if (event.target.classList.contains('matched')) {
      alert("This one's already been matched!");
      // Unclicked and unmatched cards are revealed and turned into "clicked" temporarily
    } else {
      event.target.style.backgroundColor = "#" + event.target.classList.value;
      event.target.classList.add('clicked')
      clickedCards = document.querySelectorAll('.clicked');
    }
  }

  // Timeout to stall cards from flipping back over
  setTimeout(() => {
    // If 2 cards are "clicked", compare them and if they are match then
    // remove the clicked classes and turn them into matched
    // need to increment the score and end the game when call cards are flipped
    if (clickedCards.length === 2) {
      if (clickedCards[0].classList.value === clickedCards[1].classList.value) {
        for (let cards of clickedCards) {
          cards.classList.remove('clicked');
          cards.classList.add('matched');
        }
        scoring.innerText = ++score;
        matchedCards = document.querySelectorAll('.matched');
        if (matchedCards.length === cards.length) {
          if (score < localStorage.getItem(totalPairs) || localStorage.getItem(totalPairs) === null) {
            localStorage.setItem(totalPairs, score);
          }
          const resetButton = document.createElement('Button');
          resetButton.innerText = 'Restart Game';
          resetButton.addEventListener('click', function () {
            return location.reload();
          });
          document.querySelector('ul').appendChild(resetButton);
        }
        // if cards are not a match, then flip them back over
        // by turning them white and removing "clicked" class
        // still want to increment score
      } else {
        for (let cards of clickedCards) {
          cards.style.backgroundColor = 'white';
          cards.classList.remove("clicked");
        }
        scoring.innerText = ++score;
      }
    }
  }, 1000);
}

// when the DOM loads
startButton.addEventListener('click', function () {
  createDivsForColors(shuffledColors);
  startButton.style.display = "none";
  for (let items of h2) {
    items.hidden = false;
  }
  hiScore.innerText = localStorage.getItem(totalPairs);
  console.log(totalPairs);
})
