
let DECIMAL_PLACES = 3;
function smartRound(c) {
  if (c === 0) {
    return c.toFixed(0)
  } else if (c >= 1) {
    // it can be 1.000 or 727385.12453
    return c.toFixed(DECIMAL_PLACES)
  } else {
    // it can be at max 0.999 or 0.000000435
    let extraDecimalPlaces = 0;
    for (let i = 0, x = 0; i < 5 && x === 0; i++) {
      let x = Math.floor(c*Math.pow(10, i))
      extraDecimalPlaces = i;
    }
    return c.toFixed(DECIMAL_PLACES + extraDecimalPlaces)
  }
}
export function multiply(a, b){
  let c = a*b;
  return smartRound(c);
}
export function divide(a, b){
  let c = a/b;
  return smartRound(c);
}
