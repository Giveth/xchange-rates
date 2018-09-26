import timer from "./timer";

export function getExchanges() {
  const url = "https://min-api.cryptocompare.com/data/all/exchanges";
  return fetch(url)
    .then(response => response.json())
    .catch(error => {
      console.error(error);
    });
}

/**
 * The function is async and contains awaits to ensure that is doesn't
 * frooze in cellphones. Otherwise it would be a very long syncronous
 * process, preventing the page from triggering re-renders
 *
 * @param {*} exchanges
 */
export async function getMarketsFromExchanges(exchanges) {
  const markets = {};
  const leftOptions = {};

  // using forEach on purpose to create callbacks and allow
  // re-renders in-between
  for (const exchangeCoins of Object.values(exchanges)) {
    await timer(1);
    for (const leftCoin of Object.keys(exchangeCoins)) {
      // Initialize the object if it doesn't exist
      if (!/[^a-z]/i.test(leftCoin)) {
        const rightCoinList = exchangeCoins[leftCoin];
        for (const rightCoin of rightCoinList) {
          if (!/[^a-z]/i.test(rightCoin)) {
            const market = leftCoin + "-" + rightCoin;
            const reverseMarket = rightCoin + "-" + leftCoin;
            markets[market] = true;
            markets[reverseMarket] = false;
            leftOptions[leftCoin] = true;
            leftOptions[rightCoin] = true;
          }
        }
      }
    }
  }
  return {
    markets: Object.keys(markets),
    leftOptions: Object.keys(leftOptions)
  };
}
