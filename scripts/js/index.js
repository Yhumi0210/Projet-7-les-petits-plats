import { recipes } from './dataBase/recipes.js'
import { recipeTemplate } from './templates/recipeFactory.js'
import { filterTemplate } from './functions/filter-search.js'
import {searchRecipes, updateRecipeDisplay} from './functions/search.js'
import { addTagTemplate } from './templates/tagFactory.js'
import {selectFilter} from './functions/filters.js'

getRecipes()

// sert à récupérer 
function getRecipes() {

    const cardRecipe = document.querySelector('.hero')
    cardRecipe.innerHTML = ''

    for (const recipe of recipes) {
        const recipeModel = recipeTemplate()
        const recipeDOM = recipeModel.getRecipeDOM(recipe)
        cardRecipe.appendChild(recipeDOM)
    }
}

export function getFiltersIngredients(filteredRecipes)
{
    const cardFilter = document.getElementById('ingredients-choice')
    cardFilter.innerHTML = ''

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
    const allIngredients = getIngredients()

    const filterModel = filterTemplate()
    const filterDOM = filterModel.getFilterDOM(allIngredients, 'ingredient')
    cardFilter.appendChild(filterDOM)
}

export function getFiltersAppliances(filteredRecipes) {
    const cardFilter = document.getElementById('appliance-choice')
    cardFilter.innerHTML = ''
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

export function getFiltersUstensils(filteredRecipes) {
    const cardFilter = document.getElementById('ustensil-choice')
    cardFilter.innerHTML = ''
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
                getFiltersIngredients(recipes)
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
                getFiltersAppliances(recipes)
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
                getFiltersUstensils(recipes)
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
            getFiltersIngredients(recipes)
        }
        if (type === 'appliance') {
            getFiltersAppliances(recipes)
        }
        if (type === 'ustensil') {
            getFiltersUstensils(recipes)
        }
    })
    
    cardTag.appendChild(tagDOM)
}


// les tags devront aussi apparaitre dans l'index pour qu'ils soient aussi interconnecté avec tous les autres filtres

// les filtres : dans le menu déroulant, l'ingrédient cliqué apparait en jaune et s'ajoute en tag sous la liste (index 0)
// les filtres se créés en fonction des recettes déjà affichées et à partir des appareils etc de recipes.js
// les filtres se mettent à jour à chaque fois que je clique sur un filtre car certaine recette vont disparaitre donc des ingrédients aussi
// les filtres et la recherche doivent se cumuler