import { updatePosition as updateMapPosition } from './map'

const rootElement = document.createElement('ul')
const state = {
  features: {},
  activeId: ''
}

export { render }

/**
 * Renders and sets initial state data
 * @param features
 * @returns {Element|Object}
 */
function render(features) {
  return _setState({ features, activeId: features[0].id })
}

/**
 * Creates UL element which contains all LI elements
 * @param features
 * @param activeId
 * @returns {Element|Object}
 */
function _createList(features = state.features, activeId = state.activeId) {
  rootElement.innerHTML = '' // set content empty if anything is inside
  rootElement.className = 'mdl-list'

  const allLi = features.reduce((fragment, earthquake, index) => {
    const li = _createLi(index + 1, earthquake.properties.title)
    li.addEventListener('click', () => _onClick(earthquake))
    // Show selected li element
    if (activeId === earthquake.id) {
      li.className += ' active'
    }
    fragment.appendChild(li)
    return fragment
  }, document.createDocumentFragment())

  rootElement.appendChild(allLi)
  return rootElement
}

/**
 * LI element on click function
 * @param earthquake
 * @private
 */
function _onClick(earthquake) {
  updateMapPosition(earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0])
  _setState({ activeId: earthquake.id })
}

/**
 * Set new state for app and re-render
 * @param newState
 * @returns {Element|Object}
 * @private
 */
function _setState(newState) {
  Object.assign(state, newState)
  return _createList()
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
