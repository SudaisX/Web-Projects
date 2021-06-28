API = 'https://randomuser.me/api';

// Main Area
const main = document.querySelector('#main');

// Buttons
const addUserBTN = document.querySelector('#add-user');
const doubleBTN = document.querySelector('#double');
const showMillionaresBTN = document.querySelector('#show-millionares');
const sortBTN = document.querySelector('#sort');
const calcWealthBTN = document.querySelector('#calc-wealth');

// Data
let data = [];

// Functions
// Generate a random User's name and wealth
async function addRandomUser() {
    const response = await fetch(API);
    const data = await response.json();

    const user = data.results[0];
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000),
    };

    addData(newUser);
}

// Add randomly generated user data to the data array
function addData(userData) {
    data.push(userData);
    updateDOM();
}

// Double everyone's money
function doubleMoney() {
    data = data.map((user) => {
        return { ...user, money: user.money * 2 };
    });

    updateDOM();
}

// Show Millionares only
function showMillionares() {
    data = data.filter((user) => user.money >= 1000000);
    updateDOM();
}

// Sort users by richest
function sortByRichest() {
    data.sort((a, b) => b.money - a.money);
    updateDOM();
}

// Calculate the entire wealth
function calcWealth() {
    const wealth = data.reduce((total, user) => total + user.money, 0);
    const wealthEL = document.createElement('div');
    wealthEL.innerHTML = `<h3><strong>Total Wealth:</strong>$${formatMoney(wealth)}</h3>`;
    main.append(wealthEL);
}

// Update DOM
function updateDOM(providedData = data) {
    // Clear the main area
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
    providedData.forEach((item) => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> $${formatMoney(item.money)}`;
        main.append(element);
    });
}

// Format numbers as money
function formatMoney(money) {
    return money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Event Listeners
addUserBTN.addEventListener('click', addRandomUser);
doubleBTN.addEventListener('click', doubleMoney);
showMillionaresBTN.addEventListener('click', showMillionares);
sortBTN.addEventListener('click', sortByRichest);
calcWealthBTN.addEventListener('click', calcWealth);
