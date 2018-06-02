import { EventEmitter } from 'events'
import dispatcher from '../dispatcher'
import * as utils from '../utils'
import * as initialValue from '../API/initialValues'
import computeCoinOptions from '../API/coinList';
import getPrice from '../API/price';

class AppStore extends EventEmitter {
  constructor() {
    super()
    // get initial values
    const left = initialValue.left()
    const right = initialValue.right()
    const timestamp = initialValue.timestamp()
    const value = initialValue.value()

    this.name = {
      left: left,
      right: right
    }
    this.value = {
      left: value,
      right: '-'
    }
    this.timestamp = timestamp
    this.options = {
      left: [left],
      right: [right]
    }
    this.markets = {}

    // Do the initial fetch
    let _this = this
    const req = { left, right, timestamp: timestamp.unix() }
    console.log('URL req: ',req)
    getPrice(req).then(price => {
      console.log('REQ price from AppStore-: ',price)
      _this.price = price
      _this.value.right = utils.multiply(_this.value.left, price)
      this.emit(this.tag.CHANGE_DISPLAY);
    })

    this.tag = {
      UPDATE_VALUE: 'UPDATE_VALUE',
      UPDATE_NAME: 'UPDATE_NAME',
      UPDATE_OPTIONS: 'UPDATE_OPTIONS',
      UPDATE_TIMESTAMP: 'UPDATE_TIMESTAMP',
      UPDATE_PRICE: 'UPDATE_PRICE',
      UPDATE_MARKETS: 'UPDATE_MARKETS',
      UPDATE_HASCHANGED: 'UPDATE_HASCHANGED',
      CHANGE: 'CHANGE',
      INIT: 'INIT',
      CHANGE_VALUES: 'CHANGE_VALUES',
      CHANGE_OPTIONS: {
        left: 'CHANGE_OPTIONS_LEFT',
        right: 'CHANGE_OPTIONS_RIGHT'
      },
      CHANGE_NAME: {
        left: 'CHANGE_NAME_LEFT',
        right: 'CHANGE_NAME_RIGHT'
      },
      EXCHANGE: 'EXCHANGE',
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
  getHasChanged() {
    return this.hasChanged;
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
      case this.tag.EXCHANGE: {
        const left = this.name.left
        const right = this.name.right
        this.name.left = right
        this.name.right = left
        this.emit(this.tag.SWITCHED_NAMES);
        break;
      }
      case this.tag.UPDATE_VALUE: {
        this.value.left = action.value;
        this.value.right = utils.multiply(action.value, this.price)
        this.emit(this.tag.CHANGE_DISPLAY);
        break;
      }
      case this.tag.UPDATE_NAME: {
        this.name[action.id] = action.name;
        if (action.id === 'left') {
          this.options.right = computeCoinOptions(action.name)
          this.emit(this.tag.CHANGE_OPTIONS['right'])
          if (!this.options.right.includes(this.name['right'])) {
            this.name['right'] = this.options.right[0]
            this.emit(this.tag.CHANGE_NAME['right']);
          }
        }
        this.emit(this.tag.CHANGE_NAME[action.id]);
        this.emit(this.tag.CHANGE_DISPLAY);
        break;
      }
      case this.tag.UPDATE_PRICE: {
        this.price = action.price;
        this.value.right = utils.multiply(this.value.left, this.price)
        this.emit(this.tag.CHANGE_DISPLAY);
        // Verifiers for development
        if (isNaN(action.price)) throw Error('action.price is NaN '+action.price)
        if (isNaN(this.value.right)) throw Error('this.value.right is NaN '+this.value.right)
        break;
      }
      case this.tag.UPDATE_OPTIONS: {
        this.options[action.id] = action.options;
        this.emit(this.tag.CHANGE_OPTIONS[action.id]);
        break;
      }
      case this.tag.UPDATE_MARKETS: {
        this.markets = action.variable;
        break;
      }
      case this.tag.UPDATE_TIMESTAMP: {
        this.timestamp = action.timestamp;
        this.emit(this.tag.CHANGE_DISPLAY);
        break;
      }
      case this.tag.UPDATE_HASCHANGED: {
        this.hasChanged = true;
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
