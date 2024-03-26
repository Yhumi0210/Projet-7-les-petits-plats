import { getTag, removeTag } from '../index.js'
import { selectFilter, filtersSelected } from './filters.js'

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
            }  else {
                updateSearchResults(filters)
            }
        })
        


//cette fonction sert à update la liste
        function updateSearchResults(list) {
            divSearchResult.innerHTML = ''
            displayListFilter(list)
        }

        iconCross.addEventListener('click', () => {
            inputSearchMini.value = ''
            updateSearchResults(filters)
        })

// cette fonction sert à afficher constamment la liste
        function alwaysShowFilterList(filters) {
            displayListFilter(filters)
        }
        alwaysShowFilterList(filters)
        
        function displayListFilter(list) {
            list.forEach(item => {
                const pOptionElement = document.createElement('p')
                const elementCross = document.createElement('i')
                pOptionElement.className = 'search-mini__result__choices'
                pOptionElement.textContent = item
                divSearchResult.appendChild(pOptionElement)
                pOptionElement.appendChild(elementCross)
                const isApplied = filtersSelected.find( filter => filter.type === nameFilter && filter.value === item)
                if (isApplied) {
                    pOptionElement.classList.add('yellow-choice')
                    elementCross.classList.add('fa-solid')
                    elementCross.classList.add('fa-circle-xmark')
                }
                pOptionElement.addEventListener('click', () => {
                    const isSelected = pOptionElement.classList.contains('yellow-choice')
                    selectFilter(nameFilter, item)
                    if (!isSelected) {
                        pOptionElement.classList.add('yellow-choice')
                        elementCross.classList.add('fa-solid')
                        elementCross.classList.add('fa-circle-xmark')
                        getTag(nameFilter, item)
                    } else {
                        pOptionElement.classList.remove('yellow-choice')
                        elementCross.classList.remove('fa-solid')
                        elementCross.classList.remove('fa-circle-xmark')

                        // ici je gére la suppression du tag quand on clique
                        removeTag(item)
                    }
                })
            })
        }
        
        return divFilterChoice
    }

    return { getFilterDOM }
}