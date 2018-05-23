import AppStore from '../stores/AppStore'
import * as AppActions from '../actions/AppActions'

function getPriceApiAsync(fromCoin, toCoin, timestamp, callback) {
  let url = 'https://min-api.cryptocompare.com/data/dayAvg?fsym='+fromCoin+'&tsym='+toCoin+'&toTs='+timestamp+'&extraParams=giveth';
  return fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      callback(responseJson[toCoin])
    })
    .catch((error) => {
      console.error(error);
    });
}

export default function (request = {}){
  let leftCoin = AppStore.getName('left');
  let rightCoin = AppStore.getName('right');
  let timestamp = AppStore.getTimestamp();
  // Check who calls get price

  // Compute the request
  let market = leftCoin+'-'+rightCoin;
  let markets = AppStore.getMarkets();
  if (markets[market]) {
    // market is in the correct order
    getPriceApiAsync(leftCoin, rightCoin, timestamp, function(price){
      AppActions.updatePrice(price)
      console.log('Fetched price: '+price+' '+leftCoin+'/'+rightCoin)
    })
  } else {
    // market coins are reversed
    getPriceApiAsync(rightCoin, leftCoin, timestamp, function(price){
      AppActions.updatePrice(1/price)
      console.log('Fetched price: '+price+' '+leftCoin+'/'+rightCoin)
    })
  }
}
