import querystring from "querystring";
import moment from "moment";

const query = querystring.parse(window.location.search.replace("?", "")) || {};
console.log("query", query);

export function left() {
  return query.l || "EUR";
}
export function right() {
  return query.r || "ETH";
}
export function timestamp() {
  if (
    query.t &&
    !isNaN(query.t) &&
    moment.unix(query.t) < moment().subtract(1, "days") &&
    query.t > 1
  )
    return moment.unix(query.t);
  else return moment().subtract(1, "days");
}
export function value() {
  return query.v || 1000;
}
