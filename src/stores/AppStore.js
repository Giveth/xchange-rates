import { EventEmitter } from 'events'
import dispatcher from '../dispatcher'
import params from '../params'

class AppStore extends EventEmitter {
  constructor() {
    super()
    this.leftCoin = params.leftCoin
    this.leftValue = params.leftValue
    this.rightCoin = params.rightCoin
    this.rightValue = params.rightValue
    this.leftOptions = []
    this.rightOptions = []
    this.timestamp = Date.now()
    this.markets = {}
    this.price = params.price

    this.tag = {
      UPDATE_LEFT_COIN: 'UPDATE_LEFT_COIN',
      UPDATE_LEFT_VALUE: 'UPDATE_LEFT_VALUE',
      UPDATE_RIGHT_COIN: 'UPDATE_RIGHT_COIN',
      UPDATE_RIGHT_VALUE: 'UPDATE_RIGHT_VALUE',
      UPDATE_MARKETS: 'UPDATE_MARKETS',
      UPDATE_LEFT_OPTIONS: 'UPDATE_LEFT_OPTIONS',
      UPDATE_RIGHT_OPTIONS: 'UPDATE_RIGHT_OPTIONS',
      UPDATE_TIMESTAMP: 'UPDATE_TIMESTAMP',
      CHANGE: 'CHANGE',
      INIT: 'INIT',
      CHANGE_VALUES: 'CHANGE_VALUES',
      CHANGE_LEFT_OPTIONS: 'CHANGE_LEFT_OPTIONS',
      CHANGE_RIGHT_OPTIONS: 'CHANGE_RIGHT_OPTIONS',
      CHANGE_PRICE: 'CHANGE_PRICE'
    }
  }

  getLeftOptions() {
    return this.leftOptions;
  }
  getRightOptions() {
    return this.rightOptions;
  }
  getMarkets() {
    return this.markets;
  }
  getTimestamp() {
    return this.timestamp;
  }
  getPrice() {
    return this.price;
  }

  getLeftCoin() {
    return this.leftCoin;
  }
  getLeftValue() {
    return this.leftValue;
  }
  getRightCoin() {
    return this.rightCoin;
  }
  getRightValue() {
    return this.rightValue;
  }
  getNewTradeList() {
    return this.newTradeList;
  }
  getMarketList() {
    return this.marketList;
  }
  getStraddleNames() {
    return this.straddleNames;
  }
  getMarket() {
    return this.market;
  }
  getBalance() {
    let balance = [];
    let coins = this.market.split('-');
    let _this = this;
    coins.forEach(function(coin) {
      balance.push({
        coin: coin,
        balance: _this.balance[coin]
      })
    });
    return balance;
  }
  getTicker() {
    return {
      market: this.market,
      ticker: this.ticker[this.market]
    };
  }
  getAuthenticated() {
    return this.authenticated;
  }
  getSignInMessage() {
    return this.signInMessage;
  }

  handleActions(action) {
    switch(action.type) {
      case this.tag.UPDATE_PRICE: {
        this.price = action.price;
        if (action.updateRightValue) {
          this.rightValue = action.value
        } else {
          this.leftValue = action.value
        }
        this.emit(this.tag.CHANGE_VALUES);
        break;
      }
      case this.tag.UPDATE_LEFT_OPTIONS: {
        this.leftOptions = action.variable;
        this.emit(this.tag.CHANGE_LEFT_OPTIONS);
        break;
      }
      case this.tag.UPDATE_RIGHT_OPTIONS: {
        this.rightOptions = action.variable;
        this.emit(this.tag.CHANGE);
        break;
      }
      case this.tag.UPDATE_MARKETS: {
        this.markets = action.variable;
        this.emit(this.tag.CHANGE);
        this.emit(this.tag.INIT);
        break;
      }
      case this.tag.UPDATE_TIMESTAMP: {
        this.timestamp = action.variable;
        this.emit(this.tag.CHANGE);
        break;
      }
      case this.tag.UPDATE_LEFT_COIN: {
        this.leftCoin = action.variable;
        this.emit(this.tag.CHANGE);
        break;
      }
      case this.tag.UPDATE_LEFT_VALUE: {
        this.leftValue = action.variable;
        // this.emit(this.tag.CHANGE_VALUES);
        break;
      }
      case this.tag.UPDATE_RIGHT_COIN: {
        this.rightCoin = action.variable;
        this.emit(this.tag.CHANGE_VALUES);
        break;
      }
      case this.tag.UPDATE_RIGHT_VALUE: {
        this.rightValue = action.variable;
        // this.emit(this.tag.CHANGE);
        break;
      }
      case this.tag.UPDATE_TRADELIST: {
        this.tradeList[action.tradeList.market] = action.tradeList;
        this.emit(this.tag.CHANGE);
        break;
      }
      case this.tag.UPDATE_NEWTRADELIST: {
        this.newTradeList[action.newTradeList.market] = action.newTradeList;
        this.emit(this.tag.CHANGE);
        break;
      }
      case this.tag.UPDATE_MARKETLIST: {
        this.marketList = action.marketList;
        this.emit(this.tag.CHANGE);
        break;
      }
      case this.tag.UPDATE_STRADDLENAMES: {
        this.straddleNames = action.straddleNames;
        this.emit(this.tag.CHANGE);
        break;
      }
      case this.tag.UPDATE_AUTHENTICATED: {
        this.authenticated = action.authenticated;
        this.emit(this.tag.CHANGE);
        break;
      }
      case this.tag.UPDATE_SIGNINMESSAGE: {
        this.signInMessage = action.signInMessage;
        this.emit(this.tag.CHANGE);
        break;
      }
      default:
        console.error('AppStore called without a matching tag. Available tags: ',this.tag)
    }
  }

}

const appStore = new AppStore();
dispatcher.register(appStore.handleActions.bind(appStore));

export default appStore;
