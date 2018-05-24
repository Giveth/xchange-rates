import React, { Component } from 'react'
import querystring from 'querystring'
import AppStore from './stores/AppStore'
import * as AppActions from './actions/AppActions'
import exchangeIcon from './assets/exchange2.svg'
import getPrice from './API/price'


export default class ExchangeButton extends Component {

  exchange() {
    const left = AppStore.getName('left')
    const right = AppStore.getName('right')
    console.log('EXCHANGING '+left+' <-> '+right)
    AppActions.updateName(right, 'left')
    AppActions.updateName(left, 'right')
    // Get new price
    getPrice({ left: right, right: left }).then(price => {
      console.log('OMG: price: ',price)
      AppActions.updatePrice(price)
    })
  }

  render() {
    return (
      <button
        className="copy-button exchange-button"
        onClick={this.exchange.bind(this)}
      ><img src={exchangeIcon} alt="" className="exchange-icon"/></button>
    );
  }
}
