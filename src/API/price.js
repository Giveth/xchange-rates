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

export default function (request){
  let rightCoin = AppStore.getRightCoin();
  let leftCoin = AppStore.getLeftCoin();
  let timestamp = AppStore.getTimestamp();
  // Check who calls get price
  let updateRightValue = true;
  if ('rightCoin' in request) {
    updateRightValue = true
    rightCoin = request.rightCoin
  } else if ('leftCoin' in request) {
    updateRightValue = false
    leftCoin = request.leftCoin
  } else if ('timestamp' in request) {
    updateRightValue = true
    timestamp = request.timestamp
  }
  // Compute the request
  let market = leftCoin+'-'+rightCoin;
  let markets = AppStore.getMarkets();
  if (markets[market]) {
    // market is in the correct order
    getPriceApiAsync(leftCoin, rightCoin, timestamp, function(_price){
      AppActions.updatePrice(_price, updateRightValue)
      console.log('Fetched price: '+_price+' '+leftCoin+'/'+rightCoin)
    })
  } else {
    // market coins are reversed
    getPriceApiAsync(rightCoin, leftCoin, timestamp, function(_price){
      AppActions.updatePrice(1/_price, updateRightValue)
      console.log('Fetched price: '+_price+' '+leftCoin+'/'+rightCoin)
    })
  }
}
