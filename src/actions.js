import * as t from "./actionTypes";
import {
  getExchanges,
  getMarketsFromExchanges
} from "./cryptoCompare/getMarkets";
import { getLeftOptions, getRightOptions } from "./cryptoCompare/getOptions";
import getPrice from "./cryptoCompare/getPrice";

export const updateValue = value => ({
  type: t.UPDATE_VALUE,
  value
});

export const updateTimestamp = timestamp => ({
  type: t.UPDATE_TIMESTAMP,
  timestamp
});

export const updateLeft = left => ({
  type: t.UPDATE_LEFT,
  left
});

export const updateRight = right => ({
  type: t.UPDATE_RIGHT,
  right
});

export const updatePrice = price => ({
  type: t.UPDATE_PRICE,
  price
});

export const updateLoading = loading => ({
  type: t.UPDATE_LOADING,
  loading
});

// This process is really heavy on mobile and syncronous
export const fetchMarkets = () => (dispatch, getState) => {
  dispatch(updateLoading(true));
  getExchanges().then(exchanges => {
    if (!exchanges) {
      return console.error("Markets is not defined");
    }
    getMarketsFromExchanges(exchanges).then(({ markets, leftOptions }) => {
      dispatch(updateMarkets(markets));
      console.log(markets);
      getLeftOptions(leftOptions).then(_leftOptions => {
        dispatch(updateLeftOptions(_leftOptions));
        dispatch(updateLoading(false));
        // Load left options in case there was a race condition
        dispatch(fetchRightOptions());
      });
    });
  });
};

export const updateMarkets = markets => ({
  type: t.UPDATE_MARKETS,
  markets
});

export const updateLeftOptions = leftOptions => ({
  type: t.UPDATE_LEFT_OPTIONS,
  leftOptions
});

export const updateRightOptions = rightOptions => ({
  type: t.UPDATE_RIGHT_OPTIONS,
  rightOptions
});

export const exchange = () => (dispatch, getState) => {
  dispatch({ type: t.EXCHANGE });
};

export const fetchPrice = query => (dispatch, getState) => {
  if (!query) query = getState().query;
  getPrice(query).then(price => {
    if (price) dispatch(updatePrice(price));
  });
};

export const fetchRightOptions = (left, markets) => (dispatch, getState) => {
  if (!left) left = getState().query.left;
  if (!markets) markets = getState().data.markets;
  getRightOptions(left, markets).then(rightOptions => {
    if (rightOptions) dispatch(updateRightOptions(rightOptions));
  });
};
