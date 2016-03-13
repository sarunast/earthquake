import { render, _componentDidMount, __RewireAPI__ as MainViewRewireAPI } from './main-view'

describe('main-view.js', () => {
  let earthquakeApp

  beforeEach(() => {
    earthquakeApp = render()
  })
  describe('root element', () => {
    it('should be div', () => {
      expect(earthquakeApp.tagName).to.be.equal('DIV')
    })

    it('should have specific css class', () => {
      expect(earthquakeApp.className).to.be.equal('mdl-grid')
    })
  })

  // Loading state runs first
  describe('loading state', () => {
    let loadingRoot
    beforeEach(() => {
      loadingRoot = earthquakeApp.childNodes[0]
    })

    describe('root element', () => {
      it('should be div', () => {
        expect(loadingRoot.tagName).to.be.equal('DIV')
      })

      it('should have specific css class', () => {
        expect(loadingRoot.className).to.be.equal('mdl-grid spinner')
      })
    })

    describe('children', () => {
      it('should have 3 element', () => {
        expect(loadingRoot.childNodes.length).to.be.equal(3)
      })

      describe('centering divs', () => {
        let centeringDiv
        let centeringDiv2
        beforeEach(() => {
          centeringDiv = loadingRoot.childNodes[0]
          centeringDiv2 = loadingRoot.childNodes[2]
        })

        it('should be div', () => {
          expect(centeringDiv.tagName).to.be.equal('DIV')
          expect(centeringDiv2.tagName).to.be.equal('DIV')
        })

        it('should have specific css class', () => {
          expect(centeringDiv.className).to.be.equal('mdl-layout-spacer')
          expect(centeringDiv2.className).to.be.equal('mdl-layout-spacer')
        })
      })

      describe('spinner', () => {
        let spinnerDiv
        beforeEach(() => {
          spinnerDiv = loadingRoot.childNodes[1]
        })

        it('should be div', () => {
          expect(spinnerDiv.tagName).to.be.equal('DIV')
        })

        it('should have specific css class', () => {
          expect(spinnerDiv.className).to.be.equal('mdl-spinner mdl-js-spinner is-active')
        })
      })
    })
  })

  // When data is loaded
  describe('after loading state finished', () => {
    let renderList
    let renderMap
    let responseData

    beforeEach(() => {
      // prep data/stubs
      responseData = {
        features: []
      }
      renderList = sinon
        .stub()
        .returns(document.createElement('test'))
      renderMap = sinon.stub()

      // Rewire
      MainViewRewireAPI.__Rewire__('resolveJSONP', () => Promise.resolve(responseData))
      MainViewRewireAPI.__Rewire__('renderMap', renderMap)
      MainViewRewireAPI.__Rewire__('renderList', renderList)
      return _componentDidMount()
    })

    it('rootElement should have 2 elements', () => {
      expect(earthquakeApp.childNodes.length).to.be.equal(2)
    })

    describe('top 10 earthquakes div', () => {
      let top10Div
      beforeEach(() => {
        top10Div = earthquakeApp.childNodes[0]
      })

      it('should be div', () => {
        expect(top10Div.tagName).to.be.equal('DIV')
      })

      it('should have specific css class', () => {
        const className = 'mdl-cell mdl-cell--4-col mdl-cell--12-col-tablet mdl-shadow--2dp'
        expect(top10Div.className).to.be.equal(className)
      })

      it('should call renderList method once', () => {
        expect(renderList).to.have.been.calledOnce
      })

      it('should call with specific parameters', () => {
        expect(renderList).to.have.been.calledWith(responseData.features, 0)
      })

      it('should append called element', () => {
        expect(top10Div.childNodes.length).to.be.equal(1)
        expect(top10Div.childNodes[0].tagName).to.be.equal('TEST')
      })
    })

    describe('map div', () => {
      let mapDiv
      beforeEach(() => {
        mapDiv = earthquakeApp.childNodes[1]
      })

      it('should be div', () => {
        expect(mapDiv.tagName).to.be.equal('DIV')
      })

      it('should have specific css class', () => {
        const className = 'mdl-cell mdl-cell--8-col mdl-cell--stretch mdl-shadow--2dp'
        expect(mapDiv.className).to.be.equal(className)
      })

      it('should be called once', function () {
        expect(renderMap).to.have.been.calledOnce
      })

      it('should be called with specific parameters', () => {
        expect(renderMap).to.have.been.calledWith(responseData, mapDiv)
      })
    })
  })
})
