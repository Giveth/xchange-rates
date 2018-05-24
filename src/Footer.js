import React, { Component } from 'react'
import * as giveth from './giveth'

export default class Footer extends Component {

  onClick() {
    if (document.querySelector('body').classList.contains('fun')) {
      giveth.stopFun()
    } else {
      giveth.fun()
    }
  }

  render() {
    return (
      <footer className="mastfoot mt-auto">
        <div className="inner text-center">
          <p>A <span className="like-link" onClick={this.onClick.bind(this)}>Giveth</span> Social Coding project by <a href="https://github.com/dapplion">dapplion</a>, data from <a href="https://www.cryptocompare.com/api/#">CryptoCompare</a>.</p>
        </div>
      </footer>
    )
  }

}
