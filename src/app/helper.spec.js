import { resolveJSONP } from './helper'

describe('helper.js', () => {
  it('should get data from fake endpoint', function() {
    this.timeout(10000)
    return resolveJSONP('http://jsonplaceholder.typicode.com/posts/1?callback=test', 'test')
      .then((response) => {
        expect(response.id).to.equal(1)
      })
  })
})
