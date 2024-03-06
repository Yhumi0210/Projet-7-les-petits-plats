export function addTagTemplate() {
    function addTagDOM(tag) {
        
        const divTag = document.createElement('div')
        const iconTag = document.createElement('i')
        
        divTag.className = 'tag__box'
        iconTag.className = 'tag__box__cross fa-solid fa-x'
        
        divTag.textContent = tag

        divTag.appendChild(iconTag)
        
        return divTag
    }
    return { addTagDOM }
}