const playerOneScore = document.querySelector('#playerOneScore')
const playerTwoScore = document.querySelector('#playerTwoScore')
const playerOneButton = document.querySelector('#playerOneIncrement')
const playerTwoButton = document.querySelector('#playerTwoIncrement')
const resetButton = document.querySelector('#resetScore')
const winScoreSelect = document.querySelector('#winScore')

let currPlayerOneScore = 0;
let currPlayerTwoScore = 0;
let gameOver = false;
let winningScore = 5;

winScoreSelect.addEventListener('change', function () {
    winningScore = parseInt(this.value);
    resetScore();
})

playerOneButton.addEventListener('click', () => {
    if (!gameOver) {
        currPlayerOneScore += 1;
        playerOneScore.innerText = currPlayerOneScore;
        if (currPlayerOneScore === winningScore) {
            gameOver = true;
            playerOneScore.style.color = 'green';
            playerTwoScore.style.color = 'red';
            playerOneButton.disabled = true;
            playerTwoButton.disabled = true;
        }
    }

})

playerTwoButton.addEventListener('click', () => {
    if (!gameOver) {
        currPlayerTwoScore += 1;
        playerTwoScore.innerText = currPlayerTwoScore;
        if (currPlayerTwoScore === winningScore) {
            gameOver = true;
            playerOneScore.style.color = 'red';
            playerTwoScore.style.color = 'green';
            playerOneButton.disabled = true;
            playerTwoButton.disabled = true;
        }
    }

})

resetButton.addEventListener('click', resetScore)

function resetScore() {
    currPlayerOneScore = 0;
    currPlayerTwoScore = 0;
    playerOneScore.innerText = currPlayerOneScore;
    playerTwoScore.innerText = currPlayerTwoScore;
    gameOver = false;
    playerOneScore.style.color = '';
    playerTwoScore.style.color = '';
    playerOneButton.disabled = false;
    playerTwoButton.disabled = false;
}