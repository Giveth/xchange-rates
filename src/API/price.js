import AppStore from '../stores/AppStore'
import * as AppActions from '../actions/AppActions'

function getPriceApiAsync(fromCoin, toCoin, timestamp, callback) {
  // Now this api supports the pair as direct and inverse
  let url = 'https://min-api.cryptocompare.com/data/dayAvg?fsym='+fromCoin+'&tsym='+toCoin+'&toTs='+timestamp+'&extraParams=giveth';
  return fetch(url)
    .then(response => response.json())
    .then(responseJson => {
      return responseJson[toCoin]
    })
    .catch((error) => {
      console.error(error);
    });
}

export default async function (request = {}){
  let leftCoin = request.left || AppStore.getName('left');
  let rightCoin = request.right || AppStore.getName('right');
  let timestamp = request.timestamp || AppStore.getTimestamp();

  // Now this api supports the pair as direct and inverse
  // No need to keep track of the market if it's inverse or direct
  let price = await getPriceApiAsync(leftCoin, rightCoin, timestamp)
  console.log('Fetched rate: 1 '+leftCoin+' = '+price+' '+rightCoin,' request: ',JSON.stringify(request))
  return price
}
