import AppStore from '../stores/AppStore'

function getPriceApiAsync(fromCoin, toCoin, timestamp, callback) {
  // Now this api supports the pair as direct and inverse
  let url = 'https://min-api.cryptocompare.com/data/dayAvg?fsym='+fromCoin+'&tsym='+toCoin+'&toTs='+timestamp+'&extraParams=giveth';
  return fetch(url)
    .then(response => response.json())
    .then(responseJson => {
      let type = ''
      if (responseJson.ConversionType.type) type += responseJson.ConversionType.type + ' '
      if (responseJson.ConversionType.conversionSymbol) type += 'through ' + responseJson.ConversionType.conversionSymbol
      return {
        price: responseJson[toCoin],
        type 
      }
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
  let {price, type} = await getPriceApiAsync(leftCoin, rightCoin, timestamp)
  console.log('Fetched rate: '+price+' '+rightCoin+'/'+leftCoin+', type: '+type+' - req:',request)
  return price
}
