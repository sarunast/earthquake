import { resolveJSONP, getTop10Earthquakes } from './data'
import { render as renderMap } from './components/map'
import { render as renderList } from './components/list'

const rootElement = document.createElement('div')
const state = {
  isLoading: true,
  top10Earthquakes: {
    features: []
  }
}

export { render, _componentDidMount }

/**
 * Starts loading data and creates DOM
 * @returns {Element}
 */
function render() {
  _componentDidMount() // Load our data and re-render
  return createDOM()
}

/**
 * Creates main dom for earthquake app
 * @returns {Element|Object}
 */
function createDOM(){
  rootElement.innerHTML = '' // set content empty if anything is inside
  rootElement.className = 'mdl-grid'

  if (state.isLoading) {
    // Loading spinner
    const spinnerRoot = document.createElement('div')
    rootElement.appendChild(spinnerRoot)
    spinnerRoot.className = 'mdl-grid spinner'

    const centeringDiv = document.createElement('div')
    centeringDiv.className = 'mdl-layout-spacer'

    const spinner = document.createElement('div')
    spinner.className = 'mdl-spinner mdl-js-spinner is-active'

    spinnerRoot.appendChild(centeringDiv)
    spinnerRoot.appendChild(spinner)
    spinnerRoot.appendChild(centeringDiv.cloneNode(false))
  } else {
    const ul = renderList(state.top10Earthquakes.features, 0)
    const top10Div = document.createElement('div')
    rootElement.appendChild(top10Div)
    top10Div.className = 'mdl-cell mdl-cell--4-col mdl-cell--12-col-tablet mdl-shadow--2dp'
    top10Div.appendChild(ul)

    const mapDiv = document.createElement('div')
    rootElement.appendChild(mapDiv)
    mapDiv.className = 'mdl-cell mdl-cell--8-col mdl-cell--stretch mdl-shadow--2dp'
    renderMap(state.top10Earthquakes, mapDiv)
  }

  return rootElement
}

/**
 * Set new state for app and re-render
 * @param newState
 * @private
 */
function _setState(newState) {
  Object.assign(state, newState)
  createDOM()
}

/**
 * Resolves promise and then re-renders with new data
 * @returns {*|Promise.<T>}
 * @private
 */
function _componentDidMount() {
  return getTop10Earthquakes()
    .then((top10Earthquakes) => _setState({
      isLoading: false,
      top10Earthquakes
    }))
}
