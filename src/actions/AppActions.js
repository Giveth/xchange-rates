import dispatcher from "../dispatcher";
import AppStore from '../stores/AppStore';


export function updateOptions(options, id) {
  console.log('updateRightCoinOptions # ',options.length)
  dispatcher.dispatch({
    type: AppStore.tag.UPDATE_OPTIONS,
    id,
    options
  });
}

export function updateTimestamp(timestamp) {
  dispatcher.dispatch({
    type: AppStore.tag.UPDATE_TIMESTAMP,
    timestamp: timestamp
  });
}

export function updateValue(value) {
  dispatcher.dispatch({
    type: AppStore.tag.UPDATE_VALUE,
    value: value
  });
}

export function updateMarkets(markets) {
  dispatcher.dispatch({
    type: AppStore.tag.UPDATE_MARKETS,
    markets
  });
}

export function updateName(name, id) {
  dispatcher.dispatch({
    type: AppStore.tag.UPDATE_NAME,
    id,
    name
  });
}

export function updatePrice(price) {
  dispatcher.dispatch({
    type: AppStore.tag.UPDATE_PRICE,
    price: price
  });
}
