import dispatcher from "../dispatcher";
import AppStore from '../stores/AppStore';
import getPrice from '../API/price';
import computeRightOptions from '../API/coinList';
import * as utils from '../utils';
// import * as websocketAPI from 'API/testSockets';

export function updateLeftOptions(variable) {
  dispatcher.dispatch({
    type: AppStore.tag.UPDATE_LEFT_OPTIONS,
    variable: variable
  });
}

export function updateRightOptions(variable) {
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
  getPrice({
    timestamp: timestamp
  })
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

export function updatePrice(price, updateRightValue) {
  let value;
  if (updateRightValue) {
    let leftValue = AppStore.getLeftValue()
    value = utils.multiply(leftValue, price)
  } else {
    let rightValue = AppStore.getRightValue()
    value = utils.divide(rightValue, price)
  }
  dispatcher.dispatch({
    type: AppStore.tag.UPDATE_PRICE,
    price: price,
    updateRightValue: updateRightValue,
    value: value,
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



export function updateMarketList(marketList) {
  dispatcher.dispatch({
    type: AppStore.tag.UPDATE_MARKETLIST,
    marketList: marketList
  });
}

export function updateStraddleNames(straddleNames) {
  dispatcher.dispatch({
    type: AppStore.tag.UPDATE_STRADDLENAMES,
    straddleNames: straddleNames
  });
}

export function updateAuthenticated(authenticated) {
  dispatcher.dispatch({
    type: AppStore.tag.UPDATE_AUTHENTICATED,
    authenticated: authenticated
  });
}

export function updateSignInMessage(signInMessage) {
  dispatcher.dispatch({
    type: AppStore.tag.UPDATE_SIGNINMESSAGE,
    signInMessage: signInMessage
  });
}
