import {getFiltersAppliances, getFiltersIngredients, getFiltersUstensils} from '../index.js'
import { searchRecipes, updateRecipeDisplay } from './search.js'
import { recipes } from '../dataBase/recipes.js'
import { showCounterRecipes, countDisplayedRecipes } from './recipesCounter.js'

export let filtersSelected = []
//Définissez une fonction pour mettre à jour tous les filtres en fonction des sélections actuelles
export function updateAllFilters(selectedFilters) {
    
    let filteredRecipes = filterRecipesBySelectedFilters(recipes, selectedFilters)
    const searchInput = document.getElementById('recipe-search')
    console.log(searchInput.value)
    
    if (searchInput.value.length >= 3) {
        filteredRecipes = searchRecipes(searchInput.value)
        console.log("ça se fait la" + filteredRecipes)
        filteredRecipes = filterRecipesBySelectedFilters(filteredRecipes, selectedFilters)
    }
    
    getFiltersIngredients()
    getFiltersAppliances()
    getFiltersUstensils()
    updateRecipeDisplay(filteredRecipes)

    // Calcule le nombre de recettes affichées
    const numDisplayedRecipes = countDisplayedRecipes()

    // Met à jour le compteur de recettes
    showCounterRecipes(numDisplayedRecipes)
}

// Modifiez la fonction selectFilter pour synchroniser les sélections entre les filtres
export const selectFilter = (type, value) => {
    
    const isSelected = filtersSelected.find(filter => filter.type === type && filter.value === value)
    if (isSelected === undefined) {
        filtersSelected.push({ type: type, value: value })
    } else {
        filtersSelected = filtersSelected.filter(item => !(item.type === type && item.value === value))
    }
    
    // Mettre à jour tous les filtres en fonction des sélections actuelles
    updateAllFilters(filtersSelected)
}

export function filterRecipesBySelectedFilters(allRecipes, selectedFilters) {
    console.log(allRecipes)
    return allRecipes.filter(recipe => {
        return selectedFilters.every(filter => {
            if (filter.type === 'ingredient') {
                return recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase() === filter.value.toLowerCase())
            } else if (filter.type === 'appliance') {
                return recipe.appliance.toLowerCase() === filter.value.toLowerCase()
            } else if (filter.type === 'ustensil') {
                return recipe.ustensils.some(ustensil => ustensil.toLowerCase() === filter.value.toLowerCase())
            }
            return false
        })
    })
}

export function applyFilters() {
    let filteredRecipes = filterRecipesBySelectedFilters(recipes, filtersSelected)
    const search = document.getElementById('recipe-search')
    console.log(search.value)

    if (search.value.length >= 3) {
        filteredRecipes = searchRecipes(search.value)
        console.log("ça se fait la" + filteredRecipes)
        filteredRecipes = filterRecipesBySelectedFilters(filteredRecipes, filtersSelected)
    }
    
    return filteredRecipes
}

// j'ouvre mon filtre, je choisis un ingrédient en cliquant sur un filtre
// et mes recettes se filtrent en fonction.

// comme mes recettes se mettent à jour, les filtres se mettent à jour aussimes recettes se mettent à jour, les filtres se mettent à jour aussi