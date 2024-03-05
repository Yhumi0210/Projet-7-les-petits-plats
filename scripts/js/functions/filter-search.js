import { recipes } from '../dataBase/recipes.js'
import {addTagTemplate} from './addTag.js'
import {updateRecipeDisplay} from './search.js'
import { getTag } from '../index.js'

export function filterTemplate() {
    function getFilterDOM(filters, nameFilter) {

        const divFilterChoice = document.createElement('div')
        const divSearchMini = document.createElement('div')
        const labelSearchMini = document.createElement('label')
        const inputSearchMini = document.createElement('input')
        const iconCross = document.createElement('i')
        const iconGlass = document.createElement('i')
        const divSearchResult = document.createElement('div')

        divFilterChoice.className = nameFilter
        divSearchMini.className = 'search-mini'
        labelSearchMini.setAttribute('for', `${nameFilter}-search`)
        inputSearchMini.className = 'search-mini__bar'
        inputSearchMini.setAttribute('id', `${nameFilter}-search`)
        iconCross.className = 'search-mini__cross fa-solid fa-x'
        iconGlass.className = 'search-mini__glass fa-solid fa-magnifying-glass'
        divSearchResult.className = 'search-mini__result'

        divFilterChoice.appendChild(divSearchMini)
        divSearchMini.appendChild(labelSearchMini)
        divSearchMini.appendChild(inputSearchMini)
        divSearchMini.appendChild(iconCross)
        divSearchMini.appendChild(iconGlass)
        divFilterChoice.appendChild(divSearchResult)

        inputSearchMini.addEventListener('input', () => {
            const searchText = inputSearchMini.value.trim().toLowerCase()
            if (searchText.length >= 3) {
                const filteredList = filters.filter(item => item.toLowerCase().includes(searchText))
                updateSearchResults(filteredList)
                
            } else {
                updateSearchResults(filters)
            }
        })

//cette fonction sert à update la liste
        function updateSearchResults(list) {
            divSearchResult.innerHTML = ''
            list.forEach(item => {
                const pOptionElement = document.createElement('p')
                pOptionElement.className = 'search-mini__result__choices'
                pOptionElement.textContent = item
                divSearchResult.appendChild(pOptionElement)
            })
        }


        iconCross.addEventListener('click', () => {
            inputSearchMini.value = ''
            updateSearchResults(filters)
        })

// cette fonction sert à afficher constamment la liste
        
        filters.forEach(item => {
            const pOptionElement = document.createElement('p')
            const elementCross = document.createElement('i')
            pOptionElement.className = 'search-mini__result__choices'
            pOptionElement.textContent = item
            divSearchResult.appendChild(pOptionElement)
            pOptionElement.appendChild(elementCross)
            pOptionElement.addEventListener('click', () => {
                pOptionElement.classList.toggle('yellow-choice')
                elementCross.classList.toggle('fa-solid')
                elementCross.classList.toggle('fa-circle-xmark')
                const clickedChoice = event.target.textContent
                console.log(clickedChoice)
                getTag(clickedChoice)
            })
        })
        
        return divFilterChoice
    }

    return { getFilterDOM }
}