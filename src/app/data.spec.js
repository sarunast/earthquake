import { getTop10Earthquakes, __RewireAPI__ as DataRewireAPI } from './data'

describe('data.js', () => {
  let resolvedData
  let resolveJSONP
  beforeEach(() => {
    resolvedData = {
      features: []
    }
    resolveJSONP = sinon.stub()
      .returns(Promise.resolve(resolvedData))

    DataRewireAPI.__Rewire__('resolveJSONP', resolveJSONP)
  })

  describe('method getTop10Earthquakes', () => {
    beforeEach(() => {
      // create 20 fake items for sorting
      for (let i = 0; i < 20; i++) {
        resolvedData.features.push({
          properties: { mag: i }
        })
      }
    })

    describe('method resolveJSONP', () => {
      it('should be called once', () => {
        getTop10Earthquakes()
        expect(resolveJSONP).to.have.been.calledOnce
      })

      it('should be called with specific parameters', () => {
        const param1 = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojsonp'
        const param2 = 'eqfeed_callback'
        getTop10Earthquakes()
        expect(resolveJSONP).to.have.been.calledWith(param1, param2)
      })
    })

    it('should return no more than 10 items', () => {
      expect(resolvedData.features.length).to.equal(20)

      return getTop10Earthquakes().then((newList) => {
        expect(newList.features.length).to.equal(10)
      })
    })

    it('should sort out items from highest to lowest', () => {
      expect(resolvedData.features[0].properties.mag).to.equal(0)

      return getTop10Earthquakes().then((newList) => {
        expect(newList.features[0].properties.mag).to.equal(19)
        expect(newList.features[9].properties.mag).to.equal(10)
      })
    })

    it('should not mutate the original object', () => {
      return getTop10Earthquakes().then((newList) => {
        expect(resolvedData).to.not.equal(newList)
      })
    })
  })
})
