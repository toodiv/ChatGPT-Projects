const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resultsDiv = document.getElementById('results');

searchBtn.addEventListener('click', function () {
    const query = searchInput.value.trim();
    if (query !== '') {
        searchRecipes(query);
    }
});

async function searchRecipes(query) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata`);
        const data = await response.json();
        displayRecipes(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayRecipes(recipes) {
    resultsDiv.innerHTML = '';

    if (recipes.length === 0) {
        resultsDiv.innerHTML = '<p>No recipes found.</p>';
        return;
    }

    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');
        recipeCard.innerHTML = `
            <h3>${recipe.title}</h3>
            <p>${recipe.description}</p>
            <img src="${recipe.image}" alt="${recipe.title}">
            <p><strong>Ingredients:</strong> ${recipe.ingredients.join(', ')}</p>
            <p><strong>Instructions:</strong> ${recipe.instructions}</p>
        `;
        resultsDiv.appendChild(recipeCard);
    });
}
