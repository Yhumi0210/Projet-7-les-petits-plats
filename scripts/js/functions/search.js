import { recipes } from '../dataBase/recipes.js'
export function getResultSearch()
{
    const searchBar = document.getElementById('recipe-search')
    searchBar.addEventListener('input', function() {
        const searchValue = searchBar.value.toLowerCase()
        const filteredRecipes = recipes.filter(recipe => {
            return recipe.name.toLowerCase().includes(searchValue) || recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(searchValue))
        })
        renderFilteredRecipes(filteredRecipes)
    })
}

function renderFilteredRecipes(filteredRecipes) {
    const heroContainer = document.querySelector('.hero')
    heroContainer.innerHTML = '' // Clear previous recipes
    filteredRecipes.forEach(recipe => {
        // Render each filtered recipe similarly to the original rendering logic
        // You can reuse the logic from your getRecipes() function
        // ...
    })
}
