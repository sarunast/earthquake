import Leaflet from 'leaflet'
import '../../../node_modules/leaflet/dist/leaflet.css'

export { render, updatePosition }

let map
Leaflet.Icon.Default.imagePath = '//cdn.jsdelivr.net/leaflet/1.0.0-beta.2/images/'

/**
 * Initializes map with geoJson data and sets view coordinates to Top1 Earthquake
 * @param geoData
 * @param element
 */
function render(geoData, element) {
  const nr1Coordinates = geoData.features[0].geometry.coordinates
  map = Leaflet
    .map(element)
    .setView([nr1Coordinates[1], nr1Coordinates[0]], 2)

  Leaflet
    .tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>',
      trackResize: true
    })
    .addTo(map)

  Leaflet
    .geoJson(geoData, {
      onEachFeature: (feature, layer) => layer.bindPopup(feature.properties.title)
    })
    .addTo(map)
}

/**
 * Updates current map position
 * @param lat
 * @param lng
 */
function updatePosition(lat, lng) {
  map.panTo([lat, lng])
}
