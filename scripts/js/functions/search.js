import { recipes } from '../dataBase/recipes.js'
import { recipeTemplate } from '../templates/recipeFactory.js'
import { getFiltersAppliances, getFiltersIngredients, getFiltersUstensils } from '../index.js'
import {filtersSelected, selectFilter, updateAllFilters, filterRecipesBySelectedFilters} from './filters.js'
import { showCounterRecipes, countDisplayedRecipes } from './recipesCounter.js'

// export function filterRecipes(searchText) {
//     let filteredRecipes = recipes
//
//     // Filtrer les recettes en fonction de la recherche principale
//     if (searchText.trim() !== '') {
//         filteredRecipes = filteredRecipes.filter(recipe => {
//             return recipe.name.toLowerCase().includes(searchText.toLowerCase())
//                 || recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(searchText.toLowerCase()))
//                 || recipe.description.toLowerCase().includes(searchText.toLowerCase())
//         })
//     }
//
//     // Filtrer les recettes en fonction des filtres sélectionnés
//     // Ajoute ici la logique pour filtrer en fonction des filtres sélectionnés
//
//     return filteredRecipes
// }

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

// quand on lance la recherche, il faut voir si des filtres sont déjà appliqué,
// si ils sont déjà appliqué, adapter les résultats en conséquence

// affiche constamment le nombre de recettes affichées sur la page, même sans effectuer de recherche 
document.addEventListener('DOMContentLoaded', function() {
    // Calcul du nombre total de recettes
    const totalRecipes = recipes.length

    // Affichage initial du compteur de recettes
    showCounterRecipes(totalRecipes)

    // Appel de la fonction pour gérer les événements de saisie
    searchInput()
})

// Fonction pour gérer les événements de saisie dans la barre de recherche
function searchInput() {
    
    const searchInput = document.getElementById('recipe-search')

    searchInput.addEventListener('input', () => {

        const searchText = searchInput.value
        let filteredRecipes = searchRecipes(searchText)
        
        if (filtersSelected.length) {
            filteredRecipes = filterRecipesBySelectedFilters(filteredRecipes, filtersSelected)
        }
        updateRecipeDisplay(filteredRecipes)

        if (filteredRecipes.length === 0) {
            // Si aucune recette n'est trouvée, affiche un message
            //showNoRecipesMessage()
        } else {
            // Si des recettes sont trouvées, affiche les cartes recettes
            //hideNoRecipesMessage()
            getFiltersIngredients()
            getFiltersAppliances()
            getFiltersUstensils()

            // Calcule le nombre de recettes affichées
            const numDisplayedRecipes = countDisplayedRecipes()

            // Met à jour le compteur de recettes
            showCounterRecipes(numDisplayedRecipes)
        }
        
    })
}

// function showNoRecipesMessage() {
//     const errorRecipe = document.querySelector('.hero')
//     const messageElement = document.createElement('div')
//     messageElement.setAttribute('id', 'no-recipes-message')
//     messageElement.textContent = ``
//     messageElement.style.display = 'block'
//    
//     errorRecipe.appendChild(messageElement)
// }
//
// function hideNoRecipesMessage() {
//    
//     const messageElement = document.getElementById('no-recipes-message')
//     messageElement.style.display = 'none'
// }

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