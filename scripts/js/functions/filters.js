import {getFiltersAppliances, getFiltersIngredients, getFiltersUstensils} from '../index.js'
import { searchRecipes, updateRecipeDisplay } from './search.js'
import { recipes } from '../dataBase/recipes.js'
import { showCounterRecipes, countDisplayedRecipes } from './recipesCounter.js'

export let filtersSelected = []

//Cette fonction met à jour tous les filtres en fonction des sélections actuelles
export function updateAllFilters(selectedFilters) {
    
    let filteredRecipes = filterRecipesBySelectedFilters(recipes, selectedFilters)
    const searchInput = document.getElementById('recipe-search')
    
    if (searchInput.value.length >= 3) {
        filteredRecipes = searchRecipes(searchInput.value)
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


export const selectFilter = (type, value) => {
    
    const isSelected = filtersSelected.find(filter => filter.type === type && filter.value === value)
    if (isSelected === undefined) {
        filtersSelected.push({ type: type, value: value })
    } else {
        filtersSelected = filtersSelected.filter(item => !(item.type === type && item.value === value))
    }
    
    // Met à jour tous les filtres en fonction des sélections actuelles
    updateAllFilters(filtersSelected)
}

export function filterRecipesBySelectedFilters(allRecipes, selectedFilters) {
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

    if (search.value.length >= 3) {
        filteredRecipes = searchRecipes(search.value)
        filteredRecipes = filterRecipesBySelectedFilters(filteredRecipes, filtersSelected)
    }
    
    return filteredRecipes
}