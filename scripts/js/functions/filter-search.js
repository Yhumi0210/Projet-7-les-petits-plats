import { recipes } from '../dataBase/recipes.js'

export function filterTemplate()
{
    function getFilterDOM()
    {
        const cardFilter = document.querySelector('.sort__filter')
        const sectionFilter = document.createElement('section')
        const divFilterChoice = document.createElement('div')
        const divSearchMini = document.createElement('div')
        const labelSearchMini = document.createElement('label')
        const inputSearchMini = document.createElement('input')
        const divSearchResult = document.createElement('div')

        sectionFilter.className = 'sort__filter__categories'
        divFilterChoice.className = 'choices-ingredient'
        divSearchMini.className = 'search-mini'
        labelSearchMini.setAttribute('for', 'ingredient-search')
        inputSearchMini.className = 'search-mini__bar'
        divSearchResult.className = 'search-mini__result'

        cardFilter.appendChild(sectionFilter)
        sectionFilter.appendChild(divFilterChoice)
        divFilterChoice.appendChild(divSearchMini)
        divSearchMini.appendChild(labelSearchMini)
        divSearchMini.appendChild(inputSearchMini)
        divFilterChoice.appendChild(divSearchResult)

        sectionFilter.innerHTML += 'Ingrédients'
        sectionFilter.innerHTML += `<svg class="search-mini__cross w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                                <svg class="search-mini__glass w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-widli="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>`
        sectionFilter.innerHTML += `<svg class="sort__filter__categories__arrow w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>`
    }
}