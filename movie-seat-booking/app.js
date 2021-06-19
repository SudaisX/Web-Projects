const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');

const movieSelect = document.querySelector('#movie');

const count = document.querySelector('#count');
const total = document.querySelector('#total');

const purchaseBTN = document.querySelector('#purchase-btn');

populateUI();

let ticketPrice = +movieSelect.value;

// functions

function saveMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsCount = selectedSeats.length;
    const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// event listeners
// movie select event
movieSelect.addEventListener('change', (e) => {
    ticketPrice = +e.target.value;
    saveMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

// seat click event
container.addEventListener('click', (event) => {
    if (event.target.classList.contains('seat') && !event.target.classList.contains('occupied')) {
        event.target.classList.toggle('selected');
        updateSelectedCount();
    }
});

purchaseBTN.addEventListener('click', () => {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    for (seat of selectedSeats) {
        seat.classList.remove('selected');
        seat.classList.add('occupied');
    }
    updateSelectedCount();
});

// Initial count and total set
updateSelectedCount();
