import * as AppActions from '../actions/AppActions'
import AppStore from '../stores/AppStore';
import * as ORDERED_NAMES from './fiat'


let markets = {};


function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function getCoinListApiAsync(callback) {
  let url = 'https://min-api.cryptocompare.com/data/all/exchanges';
  return fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      callback(responseJson)
    })
    .catch((error) => {
      console.error(error);
    });
}

function prioritizeCoinOrder(coinArray) {
  // Descructively intersect arrays
  const crypto = ORDERED_NAMES.CRYPTO.filter(coin => coinArray.indexOf(coin) !== -1)
  const fiat = ORDERED_NAMES.FIAT.filter(coin => coinArray.indexOf(coin) !== -1)
  // Prepend the available fiat and major crypto first
  coinArray.unshift(...crypto)
  coinArray.unshift(...fiat)
  // Remove duplicates to avoid react uniquenes problems
  return [...(new Set(coinArray))]
}

function computeAllCoinOptions() {
  let marketsArray = Object.keys(markets)
  let AllCoinOptions = marketsArray.map(market => market.split('-')[0])
  AllCoinOptions = AllCoinOptions.filter( onlyUnique ); // returns ['a', 1, 2, '1']
  AllCoinOptions.sort()
  AllCoinOptions = prioritizeCoinOrder(AllCoinOptions)
  return AllCoinOptions
}

// const preAprovedExchanges = ['OKEX','Binance','Huobi','Bitfinex','Upbit','Bithumb','Kraken','HitBTC','Bitstamp','BitZ','Bibox','BitTrex']

getCoinListApiAsync(function(res){
  let coinArchive = {};
  for (let exchange in res) {
    // if (preAprovedExchanges.includes(exchange)) {
    if (true) {
      for (let leftCoin in res[exchange]) {
        // Initialize the object if it doesn't exist
        if (!/[^a-z]/i.test(leftCoin)) {
          if (!(leftCoin in coinArchive)) {
            coinArchive[leftCoin] = {};
          }
          let rightCoinList = res[exchange][leftCoin];
          for (let i = 0; i < rightCoinList.length; i++) {
            let rightCoin = rightCoinList[i];
            coinArchive[leftCoin][rightCoin] = true
            if (!/[^a-z]/i.test(rightCoin)) {
              let market = leftCoin+'-'+rightCoin;
              markets[market] = true;
            }
          }
        }
      }
    }
  }
  // Write the list of reverse markets
  for (let market in markets) {
    let leftCoin = market.split('-')[0];
    let rightCoin = market.split('-')[1];
    let reverseMarket = rightCoin+'-'+leftCoin;
    if (!(reverseMarket in markets)) {
      markets[reverseMarket] = false;
    }
  }
  console.log('got '+Object.getOwnPropertyNames(markets).length+' markets')

  // Export results
  const AllCoinOptions = computeAllCoinOptions(markets)
  AppActions.updateOptions(AllCoinOptions, 'left')
  const coinOptions = computeCoinOptions(AppStore.getName('left'))
  AppActions.updateOptions(coinOptions, 'right')
})

export default function computeCoinOptions(coin) {
  if (!coin) coin = AppStore.getLeftCoin()
  let marketsArray = Object.keys(markets)
  let selectedMarketsArray = marketsArray.filter(market => market.split('-')[0] === coin)
  let coinOptions = selectedMarketsArray.map(market => market.split('-')[1])
  coinOptions = coinOptions.sort()
  coinOptions = prioritizeCoinOrder(coinOptions)
  return coinOptions
}

