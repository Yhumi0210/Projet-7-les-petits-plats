import {getFiltersAppliances, getFiltersIngredients, getFiltersUstensils} from '../index.js'
import {updateRecipeDisplay} from './search.js'
import { recipes } from '../dataBase/recipes.js'

export let filtersSelected = []
//Définissez une fonction pour mettre à jour tous les filtres en fonction des sélections actuelles
export function updateAllFilters(selectedFilters) {
    const filteredRecipes = filterRecipesBySelectedFilters(recipes, selectedFilters)
    getFiltersIngredients(filteredRecipes)
    getFiltersAppliances(filteredRecipes)
    getFiltersUstensils(filteredRecipes)
}

// Modifiez la fonction selectFilter pour synchroniser les sélections entre les filtres
export const selectFilter = (type, value) => {
    const isSelected = filtersSelected.find(filter => filter.type === type && filter.value === value)
    if (isSelected === undefined) {
        filtersSelected.push({ type: type, value: value })
    } else {
        filtersSelected = filtersSelected.filter(item => !(item.type === type && item.value === value))
    }
    console.log(filtersSelected)
    // Mettre à jour tous les filtres en fonction des sélections actuelles
    updateAllFilters(filtersSelected)
}

function filterRecipesBySelectedFilters(allRecipes, selectedFilters) {
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

// export const selectFilter = (type, value) => {
//     const isSelected = filtersSelected.find(filter => filter.type === type && filter.value === value)
//     if (isSelected === undefined) {
//         filtersSelected.push({ type: type, value: value })
//     } else {
//         filtersSelected = filtersSelected.filter(item => !(item.type === type && item.value === value))
//     }
//     console.log(filtersSelected)
//     // Filtrer les recettes en fonction des filtres sélectionnés
//     const filteredRecipes = filterRecipesBySelectedFilters(recipes, filtersSelected)
//
//     // Mettre à jour l'affichage des recettes avec les recettes filtrées
//     updateRecipeDisplay(filteredRecipes)
//     updateAllFilters(filtersSelected)
//     console.log(filteredRecipes)
// }

// j'ouvre mon filtre, je choisis un ingrédient en cliquant sur un filtre
// et mes recettes se filtrent en fonction.

// comme mes recettes se mettent à jour, les filtres se mettent à jour aussi