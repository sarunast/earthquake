import { render, __RewireAPI__ as ListRewireAPI } from './list'

describe('list.js', () => {
  let ulRoot
  let listData

  beforeEach(() => {
    listData = []
    ulRoot = render(listData, 0)
  })

  describe('root element', () => {
    it('should be div', () => {
      expect(ulRoot.tagName).to.be.equal('UL')
    })

    it('should have specific css class', () => {
      expect(ulRoot.className).to.be.equal('mdl-list')
    })

    it('should have 0 child nodes', () => {
      expect(ulRoot.childNodes.length).to.be.equal(0)
    })
  })

  describe('LI element', () => {
    let liData
    let liRoot
    beforeEach(() => {
      liData = {
        properties: {
          title: 'Test title'
        },
        geometry: {
          coordinates: [1, 2]
        }
      }
      listData.push(liData)
      listData.push(liData)
      ulRoot = render(listData, 0)
      liRoot = ulRoot.childNodes[0]
    })

    it('root Ul should have 2 child node', () => {
      expect(ulRoot.childNodes.length).to.be.equal(2)
    })

    it('should be LI', () => {
      expect(liRoot.tagName).to.be.equal('LI')
    })

    it('should have specific css class', () => {
      expect(liRoot.className).to.contain('mdl-list__item mdl-list__item--small')
    })

    it('should set .active class', () => {
      expect(liRoot.className).to.contain('active')
    })

    it('should not contain .active class on other', () => {
      expect(ulRoot.childNodes[1].className).not.to.contain('active')
    })

    describe('Li SPAN child element', () => {
      let spanElement
      beforeEach(() => {
        spanElement = liRoot.childNodes[0]
      })
      it('should be SPAN', () => {
        expect(spanElement.tagName).to.be.equal('SPAN')
      })

      it('should have specific css class', () => {
        expect(spanElement.className).to.be.equal('mdl-list__item-primary-content')
      })

      it('should contain two elements', () => {
        expect(spanElement.childNodes.length).to.be.equal(2)
      })

      describe('SPAN element child nodes', () => {
        let spanNumber
        let spanTitle
        beforeEach(() => {
          spanNumber = spanElement.childNodes[0]
          spanTitle = spanElement.childNodes[1]
        })

        describe('number SPAN child node', () => {
          it('should be SPAN', () => {
            expect(spanNumber.tagName).to.be.equal('SPAN')
          })

          it('should have specific css class', () => {
            expect(spanNumber.className).to.be.equal('mdl-list__item-avatar mdl-list__item-text')
          })

          it('should have node value ', () => {
            expect(spanNumber.childNodes[0].nodeValue).to.be.equal('1')
          })
        })

        describe('title SPAN child node', () => {
          it('should be SPAN', () => {
            expect(spanTitle.tagName).to.be.equal('SPAN')
          })

          it('should have specific css class', () => {
            expect(spanTitle.className).to.be.equal('item-description')
          })

          it('should have node value of 1', () => {
            expect(spanTitle.childNodes[0].nodeValue).to.be.equal(liData.properties.title)
          })
        })
      })
    })
  })
})
