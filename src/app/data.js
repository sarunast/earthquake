import { Promise } from 'es6-promise'

export { getEarthquakeData }

/**
 * Retrieves today's all earthquakes
 * @returns {Promise}
 */
function getEarthquakeData() {
  const scriptEl = document.createElement('script')
  scriptEl.setAttribute('src', 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojsonp')
  document.body.appendChild(scriptEl)

  return new Promise((resolve) => {
    window.eqfeed_callback = resolve
  })
}
