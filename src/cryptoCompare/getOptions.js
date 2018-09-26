import * as ORDERED_NAMES from "./fiat";
import timer from "./timer";

function prioritizeCoinOrder(coinArray) {
  // Descructively intersect arrays
  const byMissing = coin => coinArray.indexOf(coin) !== -1;
  const crypto = ORDERED_NAMES.CRYPTO.filter(byMissing);
  const fiat = ORDERED_NAMES.FIAT.filter(byMissing);
  // Prepend the available fiat and major crypto first
  // Remove duplicates to avoid react uniquenes problems
  return [...new Set([...fiat, ...crypto, ...coinArray])];
}

export async function getLeftOptions(leftOptions = []) {
  await timer(1);
  return prioritizeCoinOrder(leftOptions);
}

// const preAprovedExchanges = ['OKEX','Binance','Huobi','Bitfinex','Upbit','Bithumb','Kraken','HitBTC','Bitstamp','BitZ','Bibox','BitTrex']

/**
 * The function is async and contains awaits to ensure that is doesn't
 * frooze in cellphones. Otherwise it would be a very long syncronous
 * process, preventing the page from triggering re-renders
 *
 * @param {*} left
 * @param {*} markets
 */
export async function getRightOptions(left, markets = []) {
  if (!markets.length) console.warn("Markets is not defined");
  // Using reduce instead of filter + map to avoid an extra callback
  try {
    const rightOptions = [];
    const len = markets.length;
    for (let i = 0; i < len; i++) {
      const [_left, _right] = markets[i].split("-");
      if (_left === left) rightOptions.push(_right);
    }
    return prioritizeCoinOrder(rightOptions.sort());
  } catch (e) {
    console.error(
      "Error computing right options from markets: ",
      markets,
      "Error:",
      e
    );
  }
}
