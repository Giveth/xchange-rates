import * as AppActions from '../actions/AppActions'
import AppStore from '../stores/AppStore';
import getPrice from './price';

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

function computeLeftCoinOptions(markets) {
  let marketsArray = Object.keys(markets)
  let leftCoinOptions = marketsArray.map(market => market.split('-')[0])
  leftCoinOptions = leftCoinOptions.filter( onlyUnique ); // returns ['a', 1, 2, '1']
  leftCoinOptions.sort()
  AppActions.updateLeftOptions(leftCoinOptions)
}

// let preAprovedExchanges = ['Coinbase']
getCoinListApiAsync(function(res){
  let coinArchive = {};
  let markets = {};
  for (let exchange in res) {
    // if (preAprovedExchanges.includes(exchange)) {
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
    // }
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
  console.log('markets',markets)
  AppActions.updateMarkets(markets)
  computeLeftCoinOptions(markets)
  getPrice({})
  computeRightOptions()
})

export default function computeRightOptions(leftCoin) {
  if (!leftCoin) leftCoin = AppStore.getLeftCoin()
  let markets = AppStore.getMarkets()
  let marketsArray = Object.keys(markets)
  let selectedMarketsArray = marketsArray.filter(market => market.split('-')[0] === leftCoin)
  let rightOptions = selectedMarketsArray.map(market => market.split('-')[1])
  rightOptions = rightOptions.sort()
  AppActions.updateRightOptions(rightOptions)
}



  // Now you have an object with keys for every single coin available
  // This keys refer to another object which has pairs for every pair
  // let leftCoinOptions = [];
  // let rightCoinOptionsObject = {};
  // for (let leftCoin in coinArchive) {
  //   leftCoinOptions.push(leftCoin)
  //   rightCoinOptionsObject[leftCoin] = [];
  //   for (let rightCoin in coinArchive[leftCoin]) {
  //     rightCoinOptionsObject[leftCoin].push(rightCoin)
  //   }
  //   rightCoinOptionsObject[leftCoin].sort()
  // }
  // leftCoinOptions.sort()
  // _this.setState({ leftCoinOptions })
  // _this.setState({ rightCoinOptionsObject })
