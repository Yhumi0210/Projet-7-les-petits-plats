import { recipes } from './dataBase/recipes.js'
import { recipeTemplate } from './templates/recipeFactory.js'
import { filterTemplate } from './functions/filter-search.js'

getRecipes()

function getRecipes() {

    const cardRecipe = document.querySelector('.hero')
    cardRecipe.innerHTML = ''

    for (const recipe of recipes) {
        const recipeModel = recipeTemplate()
        const recipeDOM = recipeModel.getRecipeDOM(recipe)
        cardRecipe.appendChild(recipeDOM)
    }
}

function getFilters()
{
    const cardFilter = document.querySelector('.choices')

    const allIngredients = recipes.reduce((ingredients, recipe) => {
        recipe.ingredients.forEach(ingredient => {
            if (!ingredients.includes(ingredient.ingredient)) {
                ingredients.push(ingredient.ingredient)
            }
        })
        return ingredients
    }, [])

    const filterModel = filterTemplate()
    const filterDOM = filterModel.getFilterDOM(allIngredients)
    cardFilter.appendChild(filterDOM)
}

document.addEventListener('DOMContentLoaded', function() {
    const ingredientSection = document.getElementById('filter-ingredient')
    let filtersOpened = false

    ingredientSection.addEventListener('click', function(event) {
        // Vérifie si l'élément cliqué est l'icône "Ingrédients" ou son conteneur
        if (event.target === ingredientSection
            || event.target.classList.contains('sort__filter__categories__arrow')) {
            if (filtersOpened) {
                closeFilters()
                filtersOpened = false
            } else {
                getFilters()
                filtersOpened = true
            }
        }
    })

    function closeFilters() {
        // Logique pour fermer les filtres
        const cardFilter = document.querySelector('.choices')
        cardFilter.innerHTML = ''
    }
})

// function getFilters() {
//     const ingredients = [...new Set(recipes.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient)))]
//     // Obtenez tous les ingrédients uniques
//
//     const filterModel = filterTemplate()
//     const filterDOM = filterModel.getFilterDOM(ingredients)
//     // Ajoutez le DOM des filtres à l'élément existant .sort__filter__categories
//     document.querySelector('.sort__filter__categories').appendChild(filterDOM)
// }

// les filtres : dans le menu déroulant, l'ingrédient cliqué apparait en jaune et s'ajoute en tag sous la liste (index 0)
// les filtres se créés en fonction des recettes déjà affichées et à partir des appareils etc de recipes.js
// les filtres se mettent à jour à chaque fois que je clique sur un filtre car certaine recette vont disparaitre donc des ingrédients aussi
// les filtres et la recherche doivent se cumuler