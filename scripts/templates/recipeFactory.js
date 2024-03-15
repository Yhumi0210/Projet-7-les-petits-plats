import {recipes} from '../dataBase/recipes.js'

export function recipeTemplate() {
    function getRecipeDOM(recipe) {
        const cardRecipe = document.querySelector('.hero')
        const articleRecipeContainer = document.createElement('article')
        const divRecipeImg = document.createElement('div')
        const imgRecipe = document.createElement('img')
        const sectionRecipe = document.createElement('section')
        const pTimeRecipe = document.createElement('p')
        const h2TitleRecipe = document.createElement('h2')
        const divRecipeStep = document.createElement('div')
        const h3Recipe = document.createElement('h3')
        const pRecipeCook = document.createElement('p')
        const sectionElementRecipe = document.createElement('section')
        const h4ElementTitle = document.createElement('h4')
        const ulElementRecipe = document.createElement('ul')

        articleRecipeContainer.className = 'hero__container'
        divRecipeImg.className = 'hero__container__img'
        imgRecipe.className = 'hero__container__img__photo'
        sectionRecipe.className = 'hero__container__recipe'
        pTimeRecipe.className = 'hero__container__recipe__time'
        h2TitleRecipe.className = 'hero__container__recipe__title'
        divRecipeStep.className = 'hero__container__recipe__step'
        h3Recipe.className = 'hero__container__recipe__step__title'
        pRecipeCook.className = 'hero__container__recipe__step__cook'
        sectionElementRecipe.className = 'hero__container__recipe__element'
        h4ElementTitle.className = 'hero__container__recipe__element__title'
        ulElementRecipe.className = 'hero__container__recipe__element__list'

        imgRecipe.setAttribute('alt', `${recipe.name}`)
        imgRecipe.setAttribute('src', recipe.image)
        pTimeRecipe.innerHTML = `${recipe.time} min`
        h2TitleRecipe.innerHTML = `${recipe.name}`
        h3Recipe.innerHTML = 'Recette'
        pRecipeCook.innerHTML = `${recipe.description}`
        h4ElementTitle.innerHTML = 'Ingrédients'

        for (const ingredient of recipe.ingredients) {
            const liElementRecipe = document.createElement('li')
            liElementRecipe.className = 'hero__container__recipe__element__list__ingredient'
            liElementRecipe.textContent = `${ingredient.ingredient}`
            liElementRecipe.innerHTML += '<br>'

            if (ingredient.quantity && ingredient.unit) {
                const spanElementRecipe = document.createElement('span')
                spanElementRecipe.className = 'hero__container__recipe__element__list__ingredient__quantity'
                spanElementRecipe.textContent = `${ingredient.quantity} ${ingredient.unit}`
                liElementRecipe.appendChild(spanElementRecipe)
                liElementRecipe.innerHTML += ' '
            } else if (ingredient.quantity) {
                const spanElementRecipe = document.createElement('span')
                spanElementRecipe.className = 'hero__container__recipe__element__list__ingredient__quantity'
                spanElementRecipe.textContent = `${ingredient.quantity}`
                liElementRecipe.appendChild(spanElementRecipe)
            }
            ulElementRecipe.appendChild(liElementRecipe)
        }

        cardRecipe.appendChild(articleRecipeContainer)
        articleRecipeContainer.appendChild(divRecipeImg)
        divRecipeImg.appendChild(imgRecipe)
        articleRecipeContainer.appendChild(sectionRecipe)
        sectionRecipe.appendChild(pTimeRecipe)
        sectionRecipe.appendChild(h2TitleRecipe)
        sectionRecipe.appendChild(divRecipeStep)
        divRecipeStep.appendChild(h3Recipe)
        divRecipeStep.appendChild(pRecipeCook)
        sectionRecipe.appendChild(sectionElementRecipe)
        sectionElementRecipe.appendChild(h4ElementTitle)
        sectionElementRecipe.appendChild(ulElementRecipe)
        return articleRecipeContainer
    }

    return {getRecipeDOM}
}