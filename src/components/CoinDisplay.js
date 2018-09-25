import React, { Component } from "react";
import AppStore from "../stores/AppStore";
// This component receive lists of options
// and updates the user's coin selection

export default class CoinDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: AppStore.getName(this.props.id),
      value: AppStore.getValue(this.props.id)
    };
    this.updateName = this.updateName.bind(this);
    this.updateValue = this.updateValue.bind(this);
  }

  componentWillMount() {
    AppStore.on(AppStore.tag.CHANGE_DISPLAY, this.updateName);
    AppStore.on(AppStore.tag.CHANGE_DISPLAY, this.updateValue);
  }

  componentWillUnmount() {
    AppStore.removeListener(AppStore.tag.CHANGE_DISPLAY, this.updateName);
    AppStore.removeListener(AppStore.tag.CHANGE_DISPLAY, this.updateValue);
  }

  updateName() {
    this.setState({ name: AppStore.getName(this.props.id) });
  }

  updateValue() {
    this.setState({ value: AppStore.getValue(this.props.id) });
  }

  render() {
    if (this.props.showName) {
      return (
        <div className="coin-display">
          <span>{this.state.value}</span>
          <span>
            {" "}
            <strong>{this.state.name}</strong>
          </span>
        </div>
      );
    } else {
      return (
        <div className="coin-display">
          <span>{this.state.value}</span>
        </div>
      );
    }
  }
}
