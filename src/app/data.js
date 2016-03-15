import { resolveJSONP } from './helper'

export { getTop10Earthquakes }

/**
 * Gets top 10 earthquakes of the day
 * @returns {*|Promise.<T>|!Promise.<RESULT>}
 */
function getTop10Earthquakes() {
  return resolveJSONP('http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojsonp', 'eqfeed_callback')
    .then(sortEarthquakeData)
    .then(sliceTop10Earthquakes)

  /**
   * Sorts earthquakes and returns only top 10
   * @param todayEarthquakes
   * @returns {*}
   */
  function sliceTop10Earthquakes(todayEarthquakes) {
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
