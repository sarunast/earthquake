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
  let coordinates = [10.4, 126.66]

  if (geoData.features[0]) {
    coordinates = [
      geoData.features[0].geometry.coordinates[1],
      geoData.features[0].geometry.coordinates[0]
    ]
  }

  map = Leaflet
    .map(element)
    .setView(coordinates, 2)

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
  if (map) {
    map.panTo([lat, lng])
  }
}
