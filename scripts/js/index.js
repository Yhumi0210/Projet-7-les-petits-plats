import { recipes } from './dataBase/recipes.js'
import { recipeTemplate } from './templates/recipeFactory.js'
import { filterTemplate } from './functions/filter-search.js'
import { addTagTemplate } from './templates/tagFactory.js'
import {selectFilter, applyFilters} from './functions/filters.js'
import { showCounterRecipes } from './functions/recipesCounter.js'

getRecipes()


// sert à récupérer les recettes depuis recipes.js
function getRecipes() {

    const cardRecipe = document.querySelector('.hero')
    cardRecipe.textContent = ''

    const recipeModel = recipeTemplate()
    for (const recipe of recipes) {
        const recipeDOM = recipeModel.getRecipeDOM(recipe)
        cardRecipe.appendChild(recipeDOM)
    }
    showCounterRecipes()
    
}

export function getFiltersIngredients()
{
    const cardFilter = document.getElementById('ingredients-choice')
    cardFilter.innerHTML = ''

    const filteredRecipes = applyFilters()
    const getIngredients = () => {
        const ingredients = []
        filteredRecipes.forEach(recipe => {
            recipe.ingredients.forEach(ingredient => {
                if (!ingredients.includes(ingredient.ingredient.toLowerCase())) {
                    ingredients.push(ingredient.ingredient.toLowerCase())
                }
            })
        })
        return ingredients
    }
    // const getIngredients = () => {
    //     const ingredients = filteredRecipes.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase())).filter((ingredient, index, array) => array.indexOf(ingredient) === index)
    //     return ingredients
    // }

    const allIngredients = getIngredients()

    const filterModel = filterTemplate()
    const filterDOM = filterModel.getFilterDOM(allIngredients, 'ingredient')
    cardFilter.appendChild(filterDOM)
}

export function getFiltersAppliances() {
    const cardFilter = document.getElementById('appliance-choice')
    cardFilter.innerHTML = ''

    const filteredRecipes = applyFilters()
    const getAppliances = () => {
        const appliances = []
        filteredRecipes.forEach(recipe => {
            if (!appliances.includes(recipe.appliance.toLowerCase())) {
                appliances.push(recipe.appliance.toLowerCase())
            }
        })
        return appliances
    }
    const allAppliances = getAppliances()
    
    const filterModel = filterTemplate()
    const filterDOM = filterModel.getFilterDOM(allAppliances, 'appliance')
    cardFilter.appendChild(filterDOM)
        
}

export function getFiltersUstensils() {
    const cardFilter = document.getElementById('ustensil-choice')
    cardFilter.innerHTML = ''

    const filteredRecipes = applyFilters()
    const getUstensils = () => {
        const ustensils = []
        filteredRecipes.forEach(recipe => {
            recipe.ustensils.forEach(ustensil => { // Accéder à chaque ustensil
                if (!ustensils.includes(ustensil.toLowerCase())) {
                    ustensils.push(ustensil.toLowerCase())
                }
            })
        })

        return ustensils
        // à boucler dans le tableau des ustensiles
    }
    const allUstensils = getUstensils()

    const filterModel = filterTemplate()
    const filterDOM = filterModel.getFilterDOM(allUstensils, 'ustensil')
    cardFilter.appendChild(filterDOM)

}

document.addEventListener('DOMContentLoaded', function() {
    const ingredientSection = document.getElementById('filter-ingredient')
    const applianceSection = document.getElementById('filter-appliance')
    const ustensilSection = document.getElementById('filter-ustensil')
    let ingredientOpened = false
    let applianceOpened = false
    let ustensilOpened =  false

    ingredientSection.addEventListener('click', function(event) {
        const divIngredient = document.getElementById('ingredients-choice')
        const arrowElement = document.getElementById('ingredients-arrow')
        // Vérifie si l'élément cliqué est l'icône "Ingrédients" ou son conteneur
        if (event.target === ingredientSection
            || event.target.classList.contains('sort__filter__categories__arrow')) {
            if (ingredientOpened) {
                arrowElement.classList.remove('sort__filter__categories__arrow__up')
                divIngredient.classList.remove('open')
                ingredientOpened = false
            } else {
                arrowElement.classList.add('sort__filter__categories__arrow__up')
                divIngredient.classList.add('open')
                getFiltersIngredients()
                ingredientOpened = true
            }            
        }
    })

    applianceSection.addEventListener('click', function(event) {
        const divAppliance = document.getElementById('appliance-choice')
        const arrowElement = document.getElementById('appliance-arrow')
        // Vérifie si l'élément cliqué est l'icône "Ingrédients" ou son conteneur
        if (event.target === applianceSection
            || event.target.classList.contains('sort__filter__categories__arrow')) {
            if (applianceOpened) {
                arrowElement.classList.remove('sort__filter__categories__arrow__up')
                divAppliance.classList.remove('open')
                applianceOpened = false
            } else {
                arrowElement.classList.add('sort__filter__categories__arrow__up')
                divAppliance.classList.add('open')
                getFiltersAppliances()
                applianceOpened = true
            }
        }
    })

    ustensilSection.addEventListener('click', function(event) {
        const divUstensil = document.getElementById('ustensil-choice')
        const arrowElement = document.getElementById('ustensil-arrow')
        // Vérifie si l'élément cliqué est l'icône "Ingrédients" ou son conteneur
        if (event.target === ustensilSection
            || event.target.classList.contains('sort__filter__categories__arrow')) {
            if (ustensilOpened) {
                arrowElement.classList.remove('sort__filter__categories__arrow__up')
                divUstensil.classList.remove('open')
                ustensilOpened = false
            } else {
                arrowElement.classList.add('sort__filter__categories__arrow__up')
                divUstensil.classList.add('open')
                getFiltersUstensils()
                ustensilOpened = true
            }
        }
    })
})

export function getTag(type, tag) {
    const cardTag = document.querySelector('.tag')

    const tagModel = addTagTemplate()
    const tagDOM = tagModel.addTagDOM(type, tag)

    tagDOM.addEventListener('click', () => {
        selectFilter(type, tag)
        cardTag.removeChild(tagDOM)
        if (type === 'ingredient') {
            getFiltersIngredients()
        }
        if (type === 'appliance') {
            getFiltersAppliances()
        }
        if (type === 'ustensil') {
            getFiltersUstensils()
        }
    })

    cardTag.appendChild(tagDOM)
}

export function removeTag(tag) {
    const tags = document.querySelectorAll('.tag__box')
    tags.forEach(tagElement => {
        if (tagElement.textContent === tag) {
            tagElement.remove()
        }
    })

    const cardFilters = document.querySelectorAll('.sort__filter__categories__arrow__up')
    cardFilters.forEach(filter => {
        if (filter.nextElementSibling) {
            const filterList = filter.nextElementSibling.querySelector('.search-mini__result')
            if (filterList) {
                const filterItems = filterList.querySelectorAll('.search-mini__result__choices')
                filterItems.forEach(item => {
                    if (item.textContent === tag) {
                        item.classList.remove('yellow-choice')
                    }
                })
            }
        }
    })
}