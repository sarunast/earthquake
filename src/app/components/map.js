import Leaflet from 'leaflet'
import '../../styles.css'
import '../../../node_modules/leaflet/dist/leaflet.css'

export { loadMap }
Leaflet.Icon.Default.imagePath = '//cdn.jsdelivr.net/leaflet/1.0.0-beta.2/images/'

function loadMap(geoData, element) {
  const map = Leaflet
    .map(element)
    .setView([10.4, 126.66], 2)

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
