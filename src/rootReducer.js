import { combineReducers } from "redux";
import moment from "moment";
import * as t from "./actionTypes";
import { urlToQuery } from "./utils";

/**
 * Control default values
 */

const { value, timestamp, left, right } = urlToQuery();

const queryReducer = (
  state = {
    value: !isNaN(value) && parseInt(value, 10) > 0 ? value : 1000,
    timestamp:
      timestamp &&
      !isNaN(timestamp) &&
      moment.unix(timestamp) < moment().subtract(1, "days") &&
      timestamp > 1
        ? timestamp
        : moment()
            .subtract(1, "days")
            .unix(),
    left: left || "USD",
    right: right || "ETH"
  },
  action
) => {
  switch (action.type) {
    case t.UPDATE_VALUE:
      return {
        ...state,
        value: action.value
      };
    case t.UPDATE_TIMESTAMP:
      return {
        ...state,
        timestamp: action.timestamp
      };
    case t.UPDATE_LEFT:
      return {
        ...state,
        left: action.left
      };
    case t.UPDATE_RIGHT:
      return {
        ...state,
        right: action.right
      };
    case t.EXCHANGE:
      const { left, right } = state;
      return {
        ...state,
        right: left,
        left: right
      };
    default:
      return state;
  }
};

const dataReducer = (
  state = {
    price: 1.234,
    leftOptions: ["USD"],
    rightOptions: ["ETH"],
    markets: [],
    showCopyButton: false,
    loading: false
  },
  action
) => {
  switch (action.type) {
    case t.UPDATE_LOADING:
      return {
        ...state,
        loading: action.loading
      };
    case t.UPDATE_PRICE:
      return {
        ...state,
        price: action.price
      };
    case t.UPDATE_MARKETS:
      return {
        ...state,
        markets: action.markets
      };
    case t.UPDATE_LEFT_OPTIONS:
      return {
        ...state,
        leftOptions: action.leftOptions
      };
    case t.UPDATE_RIGHT_OPTIONS:
      return {
        ...state,
        rightOptions: action.rightOptions
      };
    case t.UPDATE_VALUE:
    case t.UPDATE_TIMESTAMP:
    case t.UPDATE_LEFT:
    case t.UPDATE_RIGHT:
    case t.EXCHANGE:
      return {
        ...state,
        showCopyButton: true
      };
    default:
      return state;
  }
};

export default combineReducers({
  query: queryReducer,
  data: dataReducer
});
