const urlAPI = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const imgPath = 'https://image.tmdb.org/t/p/w1280'
const searchAPI = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

const main = document.querySelector('main')
const form = document.querySelector('#form');
const search = document.querySelector('#search')

//Initialise Movies
getMovies(urlAPI)

//functions
function showMovies(movies) {
    main.innerHTML = ''

    for (movie of movies) {
        console.log('testing')
        const {
            title,
            poster_path,
            vote_average,
            overview
        } = movie

        const movieElement = document.createElement('div')
        movieElement.classList.add('movie')
        movieElement.innerHTML = `
            <img src="${imgPath + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                ${overview}
            </div>`
        main.append(movieElement)
    }

}

const getClassByRate = (vote) => {
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

async function getMovies(url) {
    const response = await fetch(url);
    const data = await response.json()

    showMovies(data.results)
}

//Event Listeners
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const searchInput = search.value
    if (searchInput) {
        getMovies(searchAPI + searchInput)
        search.value = '';
    } else {
        window.location.reload()
    }
})