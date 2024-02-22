import { recipes } from '../dataBase/recipes.js'
import { recipeTemplate } from '../templates/recipeFactory.js'


// ATTENTION : si ma recherche est vide, je n'ai plus de recherche affiché lorsque j'ai
// cherché un ingrédient non trouvé, ma page se vide
// je dois alors effacer ma saisie et mes recettes doivent s'afficher à nouveau



// Fonction pour filtrer les recettes en fonction de la recherche
function searchRecipes(searchText) {
    
    if (searchText.length >= 3) {
        const searchFilteredRecipes = recipes.filter(recipe => {
            return recipe.name.toLowerCase().includes(searchText.toLowerCase())
                || recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(searchText.toLowerCase()))
                || recipe.description.toLowerCase().includes(searchText.toLowerCase())
        })
        return searchFilteredRecipes
    } else {
    return [] // Ajout d'un retour vide si la longueur de la recherche est inférieure à 3
    }
}

// Fonction pour mettre à jour l'affichage des recettes
function updateRecipeDisplay(filteredRecipes) {
    const cardRecipe = document.querySelector('.hero')
    cardRecipe.innerHTML = ''

    for (const recipe of filteredRecipes) {
        const recipeModel = recipeTemplate()
        const recipeDOM = recipeModel.getRecipeDOM(recipe)
        cardRecipe.appendChild(recipeDOM)
    }
}

// Fonction pour gérer les événements de saisie dans la barre de recherche
function searchInput() {
    const searchInput = document.getElementById('recipe-search')

    searchInput.addEventListener('input', () => {
        const searchText = searchInput.value
        const filteredRecipes = searchRecipes(searchText)
        updateRecipeDisplay(filteredRecipes)
    })
}

// Appel de la fonction pour gérer les événements de saisie
searchInput()