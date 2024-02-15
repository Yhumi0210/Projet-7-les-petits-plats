import { recipes } from '../dataBase/recipes.js'
import { recipeTemplate } from '../templates/recipeFactory.js'

// Fonction pour filtrer les recettes en fonction de la recherche
function searchRecipes(searchText) {
    const searchFilteredRecipes = []
    for (const recipe of recipes) {
        const lowerSearchText = searchText.toLowerCase()
        if (recipe.name.toLowerCase().includes(lowerSearchText)) {
            searchFilteredRecipes.push(recipe)
        } else {
            for (const ingredient of recipe.ingredients) {
                if (ingredient.ingredient.toLowerCase().includes(lowerSearchText)) {
                    searchFilteredRecipes.push(recipe)
                    break
                }
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