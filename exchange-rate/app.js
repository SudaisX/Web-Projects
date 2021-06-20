const API = 'https://v6.exchangerate-api.com/v6/4e0c05cab951d0ce3c7f6afb/latest/';

const currencyFirst = document.querySelector('#currency-first');
const amountFirst = document.querySelector('#amount-first');

const currencySecond = document.querySelector('#currency-second');
const amountSecond = document.querySelector('#amount-second');

const swapBTN = document.querySelector('#swap-btn');
const rateEl = document.querySelector('#rate');

// Functions
// Fetches exchange rates then updates the DOM
async function calculate() {
    const res = await fetch(API + currencyFirst.value);
    const data = await res.json();
    rate = data.conversion_rates[currencySecond.value];

    amountSecond.value = (+amountFirst.value * rate).toFixed(2);
    rateEl.innerText = `1 ${currencyFirst.value} is ${rate} ${currencySecond.value} today`;
}

function swapCurrencies() {
    tempCurrency = currencyFirst.value;

    currencyFirst.value = currencySecond.value;
    // amountFirst.value = amountSecond.value;
    currencySecond.value = tempCurrency;
    calculate();
}

// Event Listeners
currencyFirst.addEventListener('change', calculate);
amountFirst.addEventListener('change', calculate);
currencySecond.addEventListener('change', calculate);
amountSecond.addEventListener('change', calculate);
swapBTN.addEventListener('click', swapCurrencies);

calculate();
