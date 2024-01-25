let $submit = $('#submit_guess');
let $guess = $('#guess');
let $result = $('#result');
let $gamesPlayed = $('#games_played');
let $hiScore = $('#hi_score');

let score = 0;

async function sendWord(e){
    e.preventDefault();
    let wordToCheck = $guess.val().toLowerCase();
    try {
        let response = await axios.post('/guess', {'guess': wordToCheck });
        let result_text = response.data.result;
        if (result_text === 'ok'){
            score += wordToCheck.length;
            $('#score').text(score);
        }
        $result.text(result_text);
        console.log(response);
    } catch (error) {
        console.error("Error:", error)
    } finally {
        $guess.val('');
    }
}

$submit.on('click', sendWord);

async function sendScore(){
    try {
        let response = await axios.post('/finished', {'score': score})
        
        console.log(response);
        let hi_score = response.data.hi_score;
        $hiScore.text(hi_score);
        console.log(hi_score);

        let games_played = response.data.games_played;
        $gamesPlayed.text(games_played);
        console.log(games_played);
    } catch (error) {
        console.error("Error:", error)
    } finally {
        console.log("Made it to finally")
    }

}

$(document).ready(function() {
    let seconds = 59;
    let timerElement = $('#timer');

    function updateTimer() {
        timerElement.text(seconds);
        seconds--;

        if (seconds < 0) {
            clearInterval(timerInterval);
            $submit.prop('disabled', true);
            console.log(score);
            sendScore();
        }
    }

    // Call the updateTimer function every second
    let timerInterval = setInterval(updateTimer, 1000);
});