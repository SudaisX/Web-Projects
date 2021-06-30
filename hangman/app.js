// DOM Elements
const wordEl = document.querySelector('#word');
const wrongLetterEl = document.querySelector('#wrong-letters');
const playAgainBTN = document.querySelector('.play-again');
const popup = document.querySelector('#popup-container');
const notification = document.querySelector('#notification-container');
const finalMessage = document.querySelector('#final-message');

// Stick Lines
const manParts = document.querySelectorAll('.man-part');

// Word Data
const words = ['application', 'programming', 'interface', 'apple', 'chicken', 'wizard'];
let selectedWord = words[Math.floor(Math.random() * words.length)];
const correctLetters = [];
const wrongLetters = [];

// Show hidden word
function displayWord() {
    wordEl.innerHTML = `
        ${selectedWord
            .split('')
            .map(
                (letter) =>
                    `<span class="letter">
                        ${correctLetters.includes(letter) ? letter : ''}
                    </span>`
            )
            .join('')}
        `;

    const innerWord = wordEl.innerText.replace(/\n/g, '');

    if (innerWord === selectedWord) {
        finalMessage.innerText = 'Congratulations! You won! 😃';
        popup.style.display = 'flex';
    }
}

// Update the wrong letters
function updateWrongLettersEl() {
    //Display Wrong letters
    wrongLetterEl.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong Letters</p>' : ''}
        ${wrongLetters.map((letter) => `<span> ${letter}</span>`)}
    `;
    //Display Parts
    manParts.forEach((part, index) => {
        const wrongs = wrongLetters.length;
        if (index < wrongs) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });
    //Check if lost
    if (wrongLetters.length === manParts.length) {
        finalMessage.innerText = `Aw, You lost at guessing ${selectedWord} ` + ':(';
        popup.style.display = 'flex';
    }
}

// Show notification
function showNotification() {
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// Event Listeners
// Keydown letter press
window.addEventListener('keydown', (e) => {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;
        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            } else {
                showNotification();
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLettersEl();
            } else {
                showNotification();
            }
        }
    }
});

//Restart game to play again
playAgainBTN.addEventListener('click', () => {
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];
    displayWord();
    updateWrongLettersEl();
    popup.style.display = 'none';
});

displayWord();
