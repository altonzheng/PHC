/**
 * A convenience wrapper over the basic fetch function.
 * @param {String} url
 * @param {Object} options
 */
export function phcFetch(url, options) {
  options = options || {}

  if (!options.headers) {
    options.headers = {
      'Content-Type': 'application/json',
    }
  }

  return fetch(url, options)
    .then(response => {
      if (!response.ok) {
        throw Error(`Unable to fetch from ${url}`)
      }

      return response.json()
    })
}
