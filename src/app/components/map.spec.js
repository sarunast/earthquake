import { render, updatePosition, __RewireAPI__ as MapRewireAPI } from './map'

describe('map.js', () => {
  let Leaflet
  let renderData
  beforeEach(() => {
    Leaflet = {
      map: sinon.stub().returnsThis(),
      setView: sinon.stub().returnsThis(),
      tileLayer: sinon.stub().returnsThis(),
      addTo: sinon.stub().returnsThis(),
      geoJson: sinon.stub().returnsThis(),
      panTo: sinon.stub().returnsThis()
    }
    renderData = { features: [] }

    MapRewireAPI.__Rewire__('Leaflet', Leaflet)
  })

  describe('method render()', () => {
    describe('Leaflet.map() method', () => {
      it('should call map once', () => {
        render(renderData)
        expect(Leaflet.map).to.have.been.calledOnce
      })

      it('should be called with specific parameters', () => {
        const testValue = 'test value'
        render(renderData, testValue)
        expect(Leaflet.map).to.have.been.calledWith(testValue)
      })
    })

    describe('method Leaflet.setView()', () => {
      it('should be called once', () => {
        render(renderData)
        expect(Leaflet.setView).to.have.been.calledOnce
      })

      it('should be called with default coordinates if they are not set', () => {
        render(renderData)
        expect(Leaflet.setView).to.have.been.calledWith([10.4, 126.66])
      })

      it('should be called with Nr1 earthquake coordinates if they exist', () => {
        const coordinates = {
          geometry: {
            coordinates: [1, 2]
          }
        }
        renderData.features.push(coordinates)
        render(renderData)

        expect(Leaflet.setView).to.have.been.calledWith(
          [coordinates.geometry.coordinates[1], coordinates.geometry.coordinates[0]], 2
        )
      })
    })

    describe('method Leaflet.tileLayer', () => {
      it('should be called once', () => {
        render(renderData)
        expect(Leaflet.tileLayer).to.have.been.calledOnce
      })

      it('should be called with specific parameters', () => {
        const param1 = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        const param2 = {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>',
          trackResize: true
        }

        render(renderData)
        expect(Leaflet.tileLayer).to.have.been.calledWith(param1, param2)
      })
    })

    describe('method Leaflet.geoJson', () => {
      it('should be called once', () => {
        render(renderData)
        expect(Leaflet.geoJson).to.have.been.calledOnce
      })

      it('should be called with specific parameters', () => {
        render(renderData)
        expect(Leaflet.geoJson).to.have.been.calledWith(renderData)
      })
    })

    describe('method Leaflet.addTo', () => {

      it('should be called twice', () => {
        render(renderData)
        expect(Leaflet.addTo).to.have.been.calledTwice
      })

      it('should be called with it self', () => {
        render(renderData)
        expect(Leaflet.addTo).to.have.been.calledWith(Leaflet)
      })
    })
  })

  describe('method updatePosition', () => {
    it('should not call Leaflet.panTo if the Leaflet instance does not exist', () => {
      updatePosition()
      expect(Leaflet.panTo).to.have.not.been.called
    })

    it('should call once if the Leaflet.map instance exist', () => {
      render(renderData)
      updatePosition()
      expect(Leaflet.panTo).to.have.been.calledOnce
    })

    it('should have been called with specific parameters', () => {
      const param1 = 'test 1'
      const param2 = 'test 2'

      render(renderData)
      updatePosition(param1, param2)
      expect(Leaflet.panTo).to.have.been.calledWith([param1, param2])
    })
  })
})
