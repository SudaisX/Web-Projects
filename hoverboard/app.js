const container = document.querySelector('#container');
const SQUARES = 1120;

for (let i = 0; i < SQUARES; i++) {
    const square = document.createElement('div');
    square.style.borderRadius = '4%'
    square.classList.add('square');
    square.addEventListener('mouseenter', () => Colorize(square))
    square.addEventListener('mouseleave', () => deColorize(square))
    container.append(square);
}

function Colorize(square) {
    const randomColor = getRandomColor();
    square.style.backgroundColor = randomColor;
    square.style.boxShadow = `0 0 2px ${randomColor}, 0 0 10px ${randomColor}`;
}

function deColorize(square) {
    square.style.backgroundColor = '';
    square.style.boxShadow = '';
}

function getRandomColor() {
    const colors = ['#f54748', '#fb9300', '#005a8d', '#99154e', '#fc5404', '#4aa96c', '#583d72', '#b83b5e', '#e3fdfd', '#ea5455', '#ffc93c'];
    return colors[Math.floor(Math.random() * colors.length) + 1];
}