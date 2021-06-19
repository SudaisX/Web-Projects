const joke = document.querySelector('#joke');
const jokeBTN = document.querySelector('#joke-btn');

async function getJoke() {
    const response = await fetch('https://icanhazdadjoke.com/', {
        headers: {
            Accept: 'application/json',
        },
    });

    const data = await response.json();
    joke.innerHTML = data.joke;
}

getJoke();
jokeBTN.addEventListener('click', getJoke);
