import { render as renderMap } from './components/map'
import { getEarthquakeData } from './data'
import { render as renderList } from './components/list'

const rootElement = document.createElement('div')
const state = {
  isLoading: true,
  top10Earthquakes: {
    features: []
  }
}

export { render }

_componentDidMount() // Load our data and re-render

/**
 * Creates earthquake list and map
 * @returns {Element}
 */
function render() {
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
    const top10Div = document.createElement('div')
    rootElement.appendChild(top10Div)
    top10Div.className = 'mdl-cell mdl-cell--4-col mdl-cell--12-col-tablet mdl-shadow--2dp'

    const mapDiv = document.createElement('div')
    rootElement.appendChild(mapDiv)
    mapDiv.className = 'mdl-cell mdl-cell--8-col mdl-cell--stretch mdl-shadow--2dp'

    const ul = renderList(state.top10Earthquakes.features)
    top10Div.appendChild(ul)
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
  render()
}

/**
 * Used for loading data
 * @returns {*|Promise.<T>}
 * @private
 */
function _componentDidMount() {
  return getEarthquakeData()
    .then(sortEarthquakeData)
    .then(getTop10Earthquakes)
    .then((top10Earthquakes) => _setState({
      isLoading: false,
      top10Earthquakes
    }))

  /**
   * Sorts earthquakes and returns only top 10
   * @param todayEarthquakes
   * @returns {*}
   */
  function getTop10Earthquakes(todayEarthquakes) {
    return Object.assign(
      {}, todayEarthquakes, { features: todayEarthquakes.features.slice(0, 10) }
    )
  }

  /**
   * Sort earthquake geoData
   * @param earthquakeGeoData
   * @returns {*}
   */
  function sortEarthquakeData(earthquakeGeoData) {
    earthquakeGeoData.features.sort((a, b) => b.properties.mag - a.properties.mag)
    return earthquakeGeoData
  }
}
