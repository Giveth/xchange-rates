import React, { Component } from "react";
import exchangeIcon from "../assets/exchange2.svg";

export default class ExchangeButton extends Component {
  render() {
    return (
      <button
        className="copy-button exchange-button"
        onClick={this.props.exchange}
      >
        <img src={exchangeIcon} alt="" className="exchange-icon" />
      </button>
    );
  }
}
