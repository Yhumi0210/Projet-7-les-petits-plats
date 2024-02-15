import { recipes } from './dataBase/recipes.js'
import { recipeTemplate } from './templates/recipeFactory.js'

getRecipes()

function getRecipes() {

    // recipeTemplate()
    const cardRecipe = document.querySelector('.hero')
    cardRecipe.innerHTML = ''

    for (const recipe of recipes) {
        const recipeModel = recipeTemplate()
        const recipeDOM = recipeModel.getRecipeDOM(recipe)
        cardRecipe.appendChild(recipeDOM)
    }
}