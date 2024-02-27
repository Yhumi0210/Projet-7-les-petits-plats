import {recipes} from '../dataBase/recipes.js'

export function filterTemplate() {
    function getFilterDOM(ingredients) {

        const divFilterChoice = document.createElement('div')
        const divSearchMini = document.createElement('div')
        const labelSearchMini = document.createElement('label')
        const inputSearchMini = document.createElement('input')
        const iconCross = document.createElement('i')
        const iconGlass = document.createElement('i')
        const divSearchResult = document.createElement('div')

        divFilterChoice.className = 'ingredient'
        divSearchMini.className = 'search-mini'
        labelSearchMini.setAttribute('for', 'ingredient-search')
        inputSearchMini.className = 'search-mini__bar'
        inputSearchMini.setAttribute('id', 'ingredient-search')
        iconCross.className = 'search-mini__cross fa-solid fa-x'
        iconGlass.className = 'search-mini__glass fa-solid fa-magnifying-glass'
        divSearchResult.className = 'search-mini__result'
        
        inputSearchMini.addEventListener('input', () => {
            const searchText = inputSearchMini.value.trim().toLowerCase()
            if (searchText.length >= 3) {
                const filteredIngredients = ingredients.filter(ingredient => ingredient.toLowerCase().includes(searchText))
                updateSearchResults(filteredIngredients)
            } else {
                updateSearchResults(ingredients)
            }
        })
//cette fonction sert à update la liste d'ingrédients
        function updateSearchResults(filteredIngredients) {
            divSearchResult.innerHTML = ''
            filteredIngredients.forEach(ingredient => {
                const pOptionElement = document.createElement('p')
                pOptionElement.className = 'search-mini__result__choices'
                pOptionElement.textContent = ingredient
                divSearchResult.appendChild(pOptionElement)
            })
        }

        divFilterChoice.appendChild(divSearchMini)
        divSearchMini.appendChild(labelSearchMini)
        divSearchMini.appendChild(inputSearchMini)
        divSearchMini.appendChild(iconCross)
        divSearchMini.appendChild(iconGlass)
        divFilterChoice.appendChild(divSearchResult)

        // cette fonction sert à afficher constamment les ingrédients
        ingredients.forEach(ingredient => {
            const pOptionElement = document.createElement('p')
            pOptionElement.className = 'search-mini__result__choices'
            pOptionElement.textContent = ingredient
            divSearchResult.appendChild(pOptionElement)
        })

        return divFilterChoice
    }

    return { getFilterDOM }
}