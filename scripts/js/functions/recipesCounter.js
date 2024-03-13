export function showCounterRecipes(numDisplayedRecipes) {
    const counterContainer = document.getElementById('counter-recipes')
    let numberRecipe = document.getElementById('recipe-counter')

    // Si le compteur n'existe pas encore dans le DOM, crée-le et ajoute-le au conteneur
    if (!numberRecipe) {
        numberRecipe = document.createElement('span')
        numberRecipe.id = 'recipe-counter'
        counterContainer.appendChild(numberRecipe)
    }

    // Met à jour le contenu du compteur en fonction du nombre de recettes affichées
    if (numDisplayedRecipes > 0) {
        numberRecipe.textContent = `${numDisplayedRecipes} recettes`
    } else {
        numberRecipe.textContent = "Aucune recette disponible"
    }
}

export function countDisplayedRecipes(numDisplayedRecipes) {
    // Compte le nombre total de recettes
    const recipeElements = document.querySelectorAll('.hero__container__recipe')
    const totalRecipes = recipeElements.length

    console.log(totalRecipes)
    return totalRecipes
}

// penser à faire une condition qui ferait que recette serait
// écrit au pluriel lorsqu'il y aurait plusieurs recettes affichées et sinon faire l'inverse