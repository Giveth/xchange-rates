import queryString from 'query-string'

const query = queryString.parseUrl(window.location.href).query || {}
console.log('query',query)

export function left() {
  return query.l || 'EUR'
}
export function right() {
  return query.r || 'ETH'
}
export function timestamp() {
  return query.t || Date.now()
}
export function value() {
  return query.v || 1000
}
