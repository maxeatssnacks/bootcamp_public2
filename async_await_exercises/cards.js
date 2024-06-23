let shuffleURL = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
let shufflePromise = axios.get(shuffleURL);

// Part 1 and 2:
// shufflePromise
//     .then(res =>{
//         let x = res.data.deck_id
//         let drawURL = `https://deckofcardsapi.com/api/deck/${x}/draw/?count=1`
//         let drawPromise = axios.get(drawURL);
//         drawPromise
//             .then(res => {
//                 console.log(`${res.data.cards[0].value} of ${res.data.cards[0].suit}`)
//             })
//             .catch(err => console.log(err))
//         return shufflePromise
//     })
//     .then(res =>{
//         let x = res.data.deck_id
//         let drawURL = `https://deckofcardsapi.com/api/deck/${x}/draw/?count=1`
//         let drawPromise = axios.get(drawURL);
//         drawPromise
//             .then(res => {
//                 console.log(`${res.data.cards[0].value} of ${res.data.cards[0].suit}`)
//             })
//             .catch(err => console.log(err))
//     })
//     .catch(err => console.log(err))

// Part 3
let deckID;

window.onload = function(){
    shufflePromise
    .then(res => {
        deckID = res.data.deck_id
        console.log(deckID)
    })
    .catch(err => console.log(err))
}


$('p').on('click', function(){
    let drawURL = `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`
    let drawPromise = axios.get(drawURL);
    drawPromise
        .then(res => {
            console.log(res.data.cards[0].images.png)
            let drawnCard = $('<img>', {
                class: "drawnCard",
                src: res.data.cards[0].images.png
            })
            $('#pile').append(drawnCard)
            let randomAngle = getRandomRotation();
    let randomTranslateX = getRandomTranslation();
    let randomTranslateY = getRandomTranslation();

    drawnCard.css('transform', `translate(-50%, -50%) translate(${randomTranslateX}px, ${randomTranslateY}px) rotate(${randomAngle}deg)`);
        })
        .catch(err => console.log("You're all out of cards"))
})

function getRandomRotation() {
    return Math.floor(Math.random() * 90 - 45); // Generate a random angle between 0 and 359 degrees
}

function getRandomTranslation() {
    return Math.floor(Math.random() * 20) - 10; // Generate a random value between -10 and 10
}

