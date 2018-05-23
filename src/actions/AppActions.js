import dispatcher from "../dispatcher";
import AppStore from '../stores/AppStore';
import getPrice from '../API/price';
import computeRightOptions from '../API/coinList';
import * as utils from '../utils';
// import * as websocketAPI from 'API/testSockets';

export function updateLeftCoinOptions(variable) {
  console.log('updateLeftCoinOptions #',variable.length)
  dispatcher.dispatch({
    type: AppStore.tag.UPDATE_LEFT_OPTIONS,
    variable: variable
  });
}

export function updateRightCoinOptions(variable) {
  console.log('updateRightCoinOptions #',variable.length)
  dispatcher.dispatch({
    type: AppStore.tag.UPDATE_RIGHT_OPTIONS,
    variable: variable
  });
}

export function updateMarkets(variable) {
  dispatcher.dispatch({
    type: AppStore.tag.UPDATE_MARKETS,
    variable: variable
  });
}

export function updateTimestamp(timestamp) {
  dispatcher.dispatch({
    type: AppStore.tag.UPDATE_TIMESTAMP,
    variable: timestamp
  });
}

export function updateValue(value) {
  dispatcher.dispatch({
    type: AppStore.tag.UPDATE_VALUE,
    value: value
  });
}

export function updateName(name, id) {
  if (id == 'left') computeRightOptions(name)
  dispatcher.dispatch({
    type: AppStore.tag.UPDATE_NAME,
    id,
    name
  });
}

export function updateLeftCoin(leftCoin) {
  computeRightOptions(leftCoin)
  dispatcher.dispatch({
    type: AppStore.tag.UPDATE_LEFT_COIN,
    variable: leftCoin
  });
  getPrice({
    leftCoin: leftCoin
  })
}

export function updateLeftValue(variable) {
  dispatcher.dispatch({
    type: AppStore.tag.UPDATE_LEFT_VALUE,
    variable: variable
  });
}

export function updateRightCoin(rightCoin) {
  getPrice({
    rightCoin: rightCoin
  })
  dispatcher.dispatch({
    type: AppStore.tag.UPDATE_RIGHT_COIN,
    variable: rightCoin
  });
}

export function updateRightValue(variable) {
  dispatcher.dispatch({
    type: AppStore.tag.UPDATE_RIGHT_VALUE,
    variable: variable
  });
}

export function updatePrice(price) {
  console.log('APPACTIONS- update price')
  dispatcher.dispatch({
    type: AppStore.tag.UPDATE_PRICE,
    price: price
  });
}


export function updateVariable(variable) {
  dispatcher.dispatch({
    type: AppStore.tag.UPDATE_VARIABLE,
    variable: variable
  });
}

// export function updateMarket(market) {
//   if(Array.isArray(market)) {
//     if (market.length > 0) {
//       updateMarketVerified(market[0])
//     }
//   } else {
//     updateMarketVerified(market)
//   }
// }
// function updateMarketVerified(market) {
//   // When the market changes, automatically fetch info
//   websocketAPI.getSingleMarket(market)
//   // Dispatch the market change event
//   dispatcher.dispatch({
//     type: AppStore.tag.UPDATE_MARKET,
//     market: market
//   });
// }
