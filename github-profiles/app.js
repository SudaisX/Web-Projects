const API_URL = 'https://api.github.com/users/';
const form = document.querySelector('.user-form');
const search = document.querySelector('#search');
const main = document.querySelector('#main');

//functions
async function getUser(username) {
    try {
        const { data } = await axios(API_URL + username);
        createUserCard(data);
        getRepos(username);
    } catch (error) {
        createErrorCard('User not found');
    }
}

async function getRepos(username) {
    try {
        const { data } = await axios(API_URL + username + '/repos?sort=created');
        addReposToCard(data);
    } catch (error) {
        createErrorCard('Problem fetching repos');
    }
}

function createUserCard(user) {
    const cardHTML = `
    <div class="card">
        <div>
            <img src="${user.avatar_url}" alt="${user.name}" class="avatar" />
        </div>
        <div class="user-info">
            <h2>${user.name}</h2>
            <p>${user.bio}</p>
            <ul>
                <li>${user.followers} <strong>Followers</strong></li>
                <li>${user.following} <strong>Following</strong></li>
                <li>${user.public_repos} <strong>Repos</strong></li>
            </ul>
            <div id="repos"></div>
        </div>
    </div>`;
    main.innerHTML = cardHTML;
}

function createErrorCard(message) {
    const cardHTML = `
    <div class="card">
        <h1>${message}</h1>
    </div>`;
    main.innerHTML = cardHTML;
}

function addReposToCard(repos) {
    const reposElement = document.querySelector('#repos');
    repos.forEach((repo) => {
        const repoElement = document.createElement('a');
        repoElement.classList.add('repo');
        repoElement.innerText = repo.name;
        repoElement.href = repo.html_url;
        repoElement.target = '_blank';

        reposElement.appendChild(repoElement);
    });
}

// event listeners
form.addEventListener('submit', (e) => {
    e.preventDefault();
    user = search.value;

    if (user) {
        getUser(user);
        search.value = '';
    }
});
