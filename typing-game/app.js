const API = 'https://api.quotable.io/random';

const text = document.querySelector('#text-display');
const input = document.querySelector('#text-input');
const timer = document.querySelector('#timer');

const scoreEl = document.querySelector('#score span');

let score = 0;

// Timer function
let startTime = new Date();
function startTimer() {
    setInterval(() => {
        const minutes = Math.floor(getTimerTime() / 60);
        const seconds = getTimerTime() - minutes * 60;
        timer.innerText = `${minutes}:${seconds} minutes`;
    }, 1000);
}

function getTimerTime() {
    return Math.floor((new Date() - startTime) / 1000);
}

// Returns a random quote/text
async function getRandomText() {
    const response = await fetch(API);
    const data = await response.json();
    return data.content;
}

// Renders a new text/quote
async function renderNewQuote() {
    const newText = await getRandomText();
    text.innerText = '';
    input.value = '';
    newText.split('').forEach((character) => {
        const span = document.createElement('span');
        span.innerText = character;
        text.append(span);
    });
    input.value = null;
    startTimer();
}

// Updates score
function updateScore() {
    newScore = +scoreEl.innerText + 1;
    scoreEl.innerText = newScore;
}

// Renders a new text/quote
renderNewQuote();

// Event Listeners
input.addEventListener('input', () => {
    let correct = true;
    chrText = text.querySelectorAll('span');
    chrInput = input.value.split('');
    chrText.forEach((chrSpan, index) => {
        const chr = chrInput[index];
        if (chr == null) {
            chrSpan.classList.remove('correct');
            chrSpan.classList.remove('incorrect');
            correct = false;
        } else if (chr == chrSpan.innerText) {
            chrSpan.classList.add('correct');
            chrSpan.classList.remove('incorrect');
        } else {
            chrSpan.classList.add('incorrect');
            chrSpan.classList.remove('correct');
            correct = false;
        }
    });
    if (correct) {
        updateScore();
        renderNewQuote();
    }
});
