import { recipes } from '../dataBase/recipes.js'
import { recipeTemplate } from '../templates/recipeFactory.js'
import { getFiltersAppliances, getFiltersIngredients, getFiltersUstensils } from '../index.js'
import {filtersSelected, filterRecipesBySelectedFilters} from './filters.js'
import { showCounterRecipes, countDisplayedRecipes } from './recipesCounter.js'

// Fonction pour filtrer les recettes en fonction de la recherche
export function searchRecipes(searchText) {
    const lowerSearchText = searchText.toLowerCase()
    if (searchText.length >= 3) {
        const searchFilteredRecipes = recipes.filter(recipe => {
            return recipe.name.toLowerCase().includes(lowerSearchText)
                || recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(lowerSearchText))
                || recipe.description.toLowerCase().includes(lowerSearchText)
        })
            return searchFilteredRecipes
    } else {
        return recipes
    }
}

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
    const recipeContainer = document.querySelector('.hero')

    searchInput.addEventListener('input', () => {

        const searchText = searchInput.value
        let filteredRecipes = searchRecipes(searchText)
        
        if (filtersSelected.length) {
            filteredRecipes = filterRecipesBySelectedFilters(filteredRecipes, filtersSelected)
        }
        updateRecipeDisplay(filteredRecipes)

        if (filteredRecipes.length === 0) {
            // Si aucune recette n'est trouvée, affiche un message
            recipeContainer.innerHTML = `<div class="sort__counter">Aucune recette ne contient « ${searchInput.value} » 
            vous pouvez chercher « tarte aux pommes », « poisson », etc.</div>`
        } else {
            // Si des recettes sont trouvées, affiche les cartes recettes
            getFiltersIngredients()
            getFiltersAppliances()
            getFiltersUstensils()
        }

        // Calcule le nombre de recettes affichées
        const numDisplayedRecipes = countDisplayedRecipes()

        // Met à jour le compteur de recettes
        showCounterRecipes(numDisplayedRecipes)
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