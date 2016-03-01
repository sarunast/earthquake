/**
 * Creates UL element which contains all LI elements
 * @param features
 * @returns {Element}
 */
export function createList(features) {
  const allLi = features.reduce((fragment, item, index) => {
    const li = _createLi(index + 1, item.properties.title)
    fragment.appendChild(li)
    return fragment
  }, document.createDocumentFragment())

  const ul = document.createElement('ul')
  ul.className = 'mdl-list'
  ul.appendChild(allLi)

  return ul
}

/**
 * Creates Li with content
 * @param index
 * @param description
 * @returns {Element}
 * @private
 */
function _createLi(index, description) {
  const numberText = document.createTextNode(index)
  const number = document.createElement('span')
  number.className = 'mdl-list__item-avatar mdl-list__item-text'
  number.appendChild(numberText)

  const titleText = document.createTextNode(`${description}`)
  const title = document.createElement('span')
  title.className = 'item-description'
  title.appendChild(titleText)

  const content = document.createElement('span')
  content.className = 'mdl-list__item-primary-content'
  content.appendChild(number)
  content.appendChild(title)

  const li = document.createElement('li')
  li.className = 'mdl-list__item mdl-list__item--small'
  li.appendChild(content)

  return li
}
