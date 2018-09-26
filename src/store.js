import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
// App modules
import rootReducer from "./rootReducer";
import * as a from "./actions";
import { queryToUrl } from "./utils";
import history from "./history";

let _query = JSON.stringify({});
let _queryPrice = JSON.stringify({});
let _left = "";

const queryWatcher = store => next => action => {
  let result = next(action);
  const query = store.getState().query;
  const { value, ...queryPrice } = query;
  const { left } = query;

  // If query changed, update the url
  const queryString = JSON.stringify(query);
  if (queryString !== _query) {
    _query = queryString;
    history.push({ search: queryToUrl(query) });

    // If queryPrice changed, fetch price
    const queryPriceString = JSON.stringify(queryPrice);
    if (queryPriceString !== _queryPrice) {
      _queryPrice = queryPriceString;
      store.dispatch(a.fetchPrice(queryPrice));

      // If left name changed, compute right options
      if (left !== _left) {
        _left = left;
        store.dispatch(a.fetchRightOptions(left));
      }
    }
  }

  return result;
};

const middleware = [thunk, queryWatcher];

// eslint-disable-next-line no-underscore-dangle
let devTools =
  process.env.NODE_ENV === "prod" ||
  process.env.NODE_ENV === "production" ||
  (typeof window === "object" && !window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
    ? // In production: pass an empty function. This can prevent unexpected errors
      a => a
    : // In development: activate the devtools extension
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(
  rootReducer, // new root reducer with router state
  compose(
    applyMiddleware(...middleware),
    // Necessary code to activate the redux chrome debug tools
    devTools
  )
);

export default store;
