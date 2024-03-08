export let filtersSelected = []
export const selectFilter = (type, value) => {
    const isSelected = filtersSelected.find(filter => filter.type === type && filter.value === value)
    if (isSelected === undefined) {
        filtersSelected.push({
            type: type,
            value: value
            // on peut écrire type, value
        })
    } else {
        filtersSelected = filtersSelected.filter(item => item.type !== type && item.value !== value)
    }
    console.log(filtersSelected)
}

// j'ouvre mon filtre, je choisis un ingrédient et mes recettes se filtrent
// en fonction.

// comme mes recettes se mettent à jour, les filtres se mettent à jour aussi
//