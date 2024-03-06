import { recipes } from '../dataBase/recipes.js'
import { recipeTemplate } from '../templates/recipeFactory.js'
import { getFiltersAppliances, getFiltersIngredients, getFiltersUstensils } from '../index.js'

// Fonction pour filtrer les recettes en fonction de la recherche
export function searchRecipes(searchText) {
    
    if (searchText.length >= 3) {
        const searchFilteredRecipes = recipes.filter(recipe => {
            return recipe.name.toLowerCase().includes(searchText.toLowerCase())
                || recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(searchText.toLowerCase()))
                || recipe.description.toLowerCase().includes(searchText.toLowerCase())
        })
        return searchFilteredRecipes
    } else {
        return recipes
    }
}

// Fonction pour gérer les événements de saisie dans la barre de recherche
function searchInput() {
    
    const searchInput = document.getElementById('recipe-search')

    searchInput.addEventListener('input', () => {
        
        const searchText = searchInput.value
        const filteredRecipes = searchRecipes(searchText)
        updateRecipeDisplay(filteredRecipes)
        getFiltersIngredients(filteredRecipes)
        getFiltersAppliances(filteredRecipes)
        getFiltersUstensils(filteredRecipes)
    })
}

// Fonction pour mettre à jour l'affichage des recettes
export function updateRecipeDisplay(filteredRecipes) {
    
    const cardRecipe = document.querySelector('.hero')
    cardRecipe.innerHTML = ''

    for (const recipe of filteredRecipes) {
        
            const recipeModel = recipeTemplate()
            const recipeDOM = recipeModel.getRecipeDOM(recipe)
            cardRecipe.appendChild(recipeDOM)
        
    }
}

// Appel de la fonction pour gérer les événements de saisie
searchInput()