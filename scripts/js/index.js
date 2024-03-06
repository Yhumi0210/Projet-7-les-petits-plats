import { recipes } from './dataBase/recipes.js'
import { recipeTemplate } from './templates/recipeFactory.js'
import { filterTemplate } from './functions/filter-search.js'
import { updateRecipeDisplay } from './functions/search.js'
import { addTagTemplate } from './functions/addTag.js'

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
        // Vérifie si l'élément cliqué est l'icône "Ingrédients" ou son conteneur
        if (event.target === ingredientSection
            || event.target.classList.contains('sort__filter__categories__arrow')) {
            if (ingredientOpened) {
                closeFilters('filter-ingredient')
                ingredientOpened = false
            } else {
                getFiltersIngredients(recipes)
                updateRecipeDisplay(recipes)
                arrowAnimation()
                ingredientOpened = true
            }
        }
    })

    applianceSection.addEventListener('click', function(event) {
        // Vérifie si l'élément cliqué est l'icône "Ingrédients" ou son conteneur
        if (event.target === applianceSection
            || event.target.classList.contains('sort__filter__categories__arrow')) {
            if (applianceOpened) {
                closeFilters('filter-appliance')
                applianceOpened = false
            } else {
                getFiltersAppliances(recipes)
                updateRecipeDisplay(recipes)
                arrowAnimation()
                applianceOpened = true
            }
        }
    })

    ustensilSection.addEventListener('click', function(event) {
        // Vérifie si l'élément cliqué est l'icône "Ingrédients" ou son conteneur
        if (event.target === ustensilSection
            || event.target.classList.contains('sort__filter__categories__arrow')) {
            if (ustensilOpened) {
                closeFilters('filter-ustensil')
                ustensilOpened = false
            } else {
                getFiltersUstensils(recipes)
                updateRecipeDisplay(recipes)
                arrowAnimation()
                ustensilOpened = true
            }
        }
    })

    function arrowAnimation(idSection) {
        document.querySelector(`#${idSection} .sort__filter__categories`).addEventListener('click', () => {
            document.querySelector('.sort__filter__categories__arrow').classList.add('sort__filter__categories__arrow__up')
        })
    }
    
    function closeFilters(idSection) {
        // Logique pour fermer les filtres
        const cardFilter = document.querySelector(`#${idSection} .choices`)
        cardFilter.innerHTML = ''
    }
})

export function getTag(tag) {
    const cardTag = document.querySelector('.tag')
    const existingTags = cardTag.querySelectorAll('.tag__box')

    const tagExists = Array.from(existingTags).some(existingTag => existingTag.textContent === tag)

    if (!tagExists) {
        const tagModel = addTagTemplate()
        const tagDOM = tagModel.addTagDOM(tag)
        cardTag.appendChild(tagDOM)
    }
}

// les tags devront aussi apparaitre dans l'index pour qu'ils soient aussi interconnecté avec tous les autres filtres

// les filtres : dans le menu déroulant, l'ingrédient cliqué apparait en jaune et s'ajoute en tag sous la liste (index 0)
// les filtres se créés en fonction des recettes déjà affichées et à partir des appareils etc de recipes.js
// les filtres se mettent à jour à chaque fois que je clique sur un filtre car certaine recette vont disparaitre donc des ingrédients aussi
// les filtres et la recherche doivent se cumuler