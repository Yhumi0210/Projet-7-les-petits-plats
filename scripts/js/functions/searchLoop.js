import { recipes } from '../dataBase/recipes.js'
import { recipeTemplate } from '../templates/recipeFactory.js'

// Fonction pour filtrer les recettes en fonction de la recherche
function searchRecipes(searchText) {
    const searchFilteredRecipes = []
    const lowerSearchText = searchText.toLowerCase()
    if (searchText.length >= 3) {
        for (const recipe of recipes) {
            if (recipe.name.toLowerCase().includes(lowerSearchText)) {
                searchFilteredRecipes.push(recipe)
            } else if (recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(lowerSearchText))) {
                searchFilteredRecipes.push(recipe)
            } else if (recipe.description.toLowerCase().includes(lowerSearchText)) {
                searchFilteredRecipes.push(recipe)
            }
        }
    }

    return searchFilteredRecipes
}

// Fonction pour mettre à jour l'affichage des recettes
function updateRecipeDisplay(filteredRecipes) {
    const cardRecipe = document.querySelector('.hero')
    cardRecipe.innerHTML = ''
    for (const recipe of filteredRecipes) {
        const recipeModel = recipeTemplate()
        const recipeDOM = recipeModel.getRecipeDOM(recipe)
        cardRecipe.appendChild(recipeDOM)
    }
}

// Fonction pour gérer les événements de saisie dans la barre de recherche
function searchInput() {
    const searchInput = document.getElementById('recipe-search')
    searchInput.addEventListener('input', () => {
        const searchText = searchInput.value
        const filteredRecipes = searchRecipes(searchText)
        updateRecipeDisplay(filteredRecipes)
    })
}

// Appel de la fonction pour gérer les événements de saisie
searchInput()