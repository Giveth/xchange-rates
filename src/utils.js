let DECIMAL_PLACES = 6;
function smartRound(c) {
  if (c === 0) {
    return c.toFixed(0);
  } else if (c >= 1) {
    // it can be 1.000 or 727385.12453
    return c.toFixed(DECIMAL_PLACES);
  } else {
    // it can be at max 0.999 or 0.000000435
    let extraDecimalPlaces = 0;
    for (let i = 0, x = 0; i < 5 && x === 0; i++) {
      x = Math.floor(c * Math.pow(10, i));
      extraDecimalPlaces = i;
    }
    return c.toFixed(DECIMAL_PLACES + extraDecimalPlaces);
  }
}
export function multiply(a, b) {
  let c = a * b;
  return smartRound(c);
}
export function divide(a, b) {
  let c = a / b;
  return smartRound(c);
}

/**
 *
 * @param {Object} query
 * @returns ?l=USD&r=ETH&t=1536055200&v=1000
 */
export function queryToUrl(query = {}) {
  return (
    "?" +
    Object.keys(query)
      .map(key => key.charAt(0) + "=" + query[key])
      .join("&")
  );
}

/**
 *
 * @param {String} ?l=USD&r=ETH&t=1536055200&v=1000
 * @returns
 */
export function urlToQuery() {
  const query = {};
  const params = window.location.search.replace("?", "").split("&") || [];
  for (const param of params) {
    const [key, val] = param.split("=");
    if (key && val) {
      if (key === "l") query.left = val;
      if (key === "r") query.right = val;
      if (key === "v") query.value = val;
      if (key === "t") query.timestamp = val;
    }
  }
  return query;
}
