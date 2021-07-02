const searchAPI = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

const search = document.querySelector('#search');
const submit = document.querySelector('#submit');
const random = document.querySelector('#random');

const mealsEl = document.querySelector('#meals');
const singleMealEl = document.querySelector('#single-meal');
const resultHeading = document.querySelector('#result-heading');

// Search for a meal
async function searchMeal(event) {
    event.preventDefault();
    // Clear single meal
    singleMealEl.innerHTML = '';
    // Get Search Term
    const term = search.value;
    // Check if empty
    if (term.trim()) {
        // Fetching for meal(s)
        const response = await fetch(searchAPI + term);
        const data = await response.json();
        //Updating Result Heading
        resultHeading.innerHTML = `<h2>Showing search results for <span class='search-term'>${term}</span></h2>`;
        //if no meals found
        if (data.meals === null) {
            resultHeading.innerHTML = `<p>There are no search results for ${term}. Try again</p>`;
        } else {
            mealsEl.innerHTML = data.meals
                .map(
                    (meal) => `
                <div class='meal'>
                    <img src="${meal.strMealThumb}" alr="${meal.strMeal}"/> 
                    <div class="meal-info" data-mealID="${meal.idMeal}">
                        <h3>${meal.strMeal}</h3>
                    </div>
                </div>`
                )
                .join('');
            //Clear Search Text
            search.value = '';
        }

        // Debug
        console.log(data);
    } else {
        alert('Please enter a search term');
    }
}

// Fetch a meal by its ID
async function getMealByID(mealID) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    const data = await response.json();

    const meal = data.meals[0];
    addMealToDOM(meal);
}

async function getRandomMeal() {
    // Clear
    mealsEl.innerHTML = '';
    resultHeading.innerHTML = '';

    //Fetching random meal
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data = await response.json();

    const meal = data.meals[0];
    addMealToDOM(meal);
}

// Add meal to DOM
function addMealToDOM(meal) {
    //Get ingredients
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(
                `<span class='ingredient-name'>${meal[`strIngredient${i}`]}</span> <span class='qty'>${
                    meal[`strMeasure${i}`]
                }<span> `
            );
        } else {
            break;
        }
    }

    resultHeading.innerHTML = '';
    meals.innerHTML = '';

    singleMealEl.innerHTML = `
        <div class='single-meal'>
            <h1>${meal.strMeal}</h2>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
            <div class="single-meal-info">
                ${meal.strCategory ? `<p><span>Category:</span> ${meal.strCategory}</p>` : ''}
                ${meal.strArea ? `<p><span>Origin:</span> ${meal.strArea}</p>` : ''}
            </div>
            <div class="main">
                <h2>Ingredients</h2>
                <ul>
                    ${ingredients.map((ingr) => `<li>${ingr}</li>`).join('')}
                </ul>
                <h2>Instructions</h2>
                <div class='instructions-container'>
                    <p>${meal.strInstructions}</p>
                </div>
                
            </div>
        <div>
    `;
}

// Search for a meal
submit.addEventListener('submit', searchMeal);

// When you click on a searched meal
mealsEl.addEventListener('click', (event) => {
    const mealInfo = event.path.find((item) => {
        if (item.classList) {
            return item.classList.contains('meal-info');
        } else {
            return false;
        }
    });

    // Check if meal info found
    if (mealInfo) {
        const mealID = mealInfo.getAttribute('data-mealid');
        getMealByID(mealID);
    }
});

// Get a random meal
random.addEventListener('click', getRandomMeal);
