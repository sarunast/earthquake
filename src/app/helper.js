import { Promise } from 'es6-promise'

export { resolveJSONP }

/**
 * Resolves JSONP request as a promise
 * @param url
 * @param callback
 * @returns {Promise}
 */
function resolveJSONP(url, callback) {
  const scriptEl = document.createElement('script')
  scriptEl.setAttribute('src', url)
  document.body.appendChild(scriptEl)

  return new Promise((resolve) => {
    window[callback] = resolve
  })
}