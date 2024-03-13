export function addTagTemplate() {
    function addTagDOM(type, tag) {

        const divTag = document.createElement('div')
        const iconTag = document.createElement('i')

        divTag.className = 'tag__box'
        iconTag.className = 'tag__box__cross fa-solid fa-x'

        divTag.dataset.type = type
// dataset sert à stocker des infos
        divTag.textContent = tag

        divTag.appendChild(iconTag)

        return divTag

    }
    return { addTagDOM }
}