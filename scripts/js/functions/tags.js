import { recipes } from '../dataBase/recipes.js'
import { updateRecipeDisplay } from './search.js'

// fonction pour supprimer le filtre correspondant
// export function removeFilter(tag) {
//     const filtersContainer = document.querySelector('.tag')
//
//     // Parcoure chaque élément de filtre pour trouver celui correspondant au tag
//     filtersContainer.childNodes.forEach(filter => {
//         if (filter.textContent.trim() === tag) {
//             // Supprime l'élément de filtre correspondant
//             filter.remove()
//         }
//     })
//
//     // mettre à jour les recettes affichées après avoir supprimé le filtre
//     updateRecipeDisplay(recipes)
// }