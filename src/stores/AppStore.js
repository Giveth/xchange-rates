import { EventEmitter } from 'events'
import dispatcher from '../dispatcher'
import params from '../params'
import getPrice from '../API/price'
import computeRightOptions from '../API/coinList';
import * as utils from '../utils'
// Initial values
import * as initialValue from '../API/initialValues'



class AppStore extends EventEmitter {
  constructor() {
    super()
    this.name = {
      left: initialValue.left(),
      right: initialValue.right()
    }
    this.value = {
      left: initialValue.value(),
      right: '-'
    }
    this.timestamp = initialValue.timestamp()
    this.options = {
      left: ['EUR','USD'],
      right: ['ETH','BTC']
    }
    this.leftCoin = params.leftCoin
    this.leftValue = params.leftValue
    this.rightCoin = params.rightCoin
    this.rightValue = params.rightValue
    this.leftOptions = []
    this.rightOptions = []
    this.markets = {}
    this.price = params.price

    this.tag = {
      UPDATE_VALUE: 'UPDATE_VALUE',
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
      CHANGE_OPTIONS: {
        left: 'CHANGE_OPTIONS_LEFT',
        right: 'CHANGE_OPTIONS_RIGHT'
      },
      UPDATE_PRICE: 'UPDATE_PRICE',
      CHANGE_LEFT_OPTIONS: 'CHANGE_LEFT_OPTIONS',
      CHANGE_RIGHT_OPTIONS: 'CHANGE_RIGHT_OPTIONS',
      CHANGE_PRICE: 'CHANGE_PRICE',
      CHANGE_DISPLAY: 'CHANGE_DISPLAY'
    }
  }

  getName(id) {
    return this.name[id];
  }
  getValue(id) {
    return this.value[id];
  }
  getOptions(id) {
    return this.options[id];
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


  handleActions(action) {
    switch(action.type) {
      case this.tag.UPDATE_VALUE: {
        this.value.left = action.value;
        this.value.right = utils.multiply(action.value, this.price)
        this.emit(this.tag.CHANGE_DISPLAY);
        break;
      }
      case this.tag.UPDATE_NAME: {
        console.log('UPDATE '+action.id+' NAME: '+action.name)
        this.name[action.id] = action.name;
        getPrice()
        this.emit(this.tag.CHANGE_DISPLAY);
        break;
      }
      case this.tag.UPDATE_PRICE: {
        this.price = action.price;
        this.value.right = utils.multiply(this.value.left, this.price)
        console.log('UPDATE PRICE: this.value.right',this.value.right)
        this.emit(this.tag.CHANGE_DISPLAY);
        break;
      }
      case this.tag.UPDATE_LEFT_OPTIONS: {
        this.options.left = action.variable;
        this.emit(this.tag.CHANGE_OPTIONS['left']);
        break;
      }
      case this.tag.UPDATE_RIGHT_OPTIONS: {
        this.options.right = action.variable;
        this.emit(this.tag.CHANGE_OPTIONS['right']);
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
        getPrice()
        this.emit(this.tag.CHANGE_DISPLAY);
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
