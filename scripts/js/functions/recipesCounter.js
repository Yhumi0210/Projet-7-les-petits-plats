export function showCounterRecipes(numDisplayedRecipes) {
    const counterContainer = document.getElementById('counter-recipes')
    let numberRecipe = document.getElementById('recipe-counter')

    // Si le compteur n'existe pas encore dans le DOM, il est créé et ajouté
    if (!numberRecipe) {
        numberRecipe = document.createElement('span')
        numberRecipe.id = 'recipe-counter'
        counterContainer.appendChild(numberRecipe)
    }

    // Met à jour le contenu du compteur en fonction du nombre de recettes affichées
    if (numDisplayedRecipes > 0) {
        numberRecipe.textContent = `${numDisplayedRecipes} recettes`
        if (numDisplayedRecipes === 1) {
            numberRecipe.textContent = `${numDisplayedRecipes} recette`
        }
    } else {
        numberRecipe.textContent = 'Aucune recette disponible'
    }
}

export function countDisplayedRecipes() {
    // Compte le nombre total de recettes
    const recipeElements = document.querySelectorAll('.hero__container__recipe')
    const totalRecipes = recipeElements.length

    return totalRecipes
}