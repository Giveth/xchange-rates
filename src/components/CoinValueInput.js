import React, { Component } from "react";
import * as AppActions from "../actions/AppActions";
import AppStore from "../stores/AppStore";

export default class CoinValueInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: AppStore.getValue(this.props.id)
    };
    this.updateValue = this.updateValue.bind(this);
  }

  componentWillMount() {
    AppStore.on(AppStore.tag.CHANGE_DISPLAY, this.updateValue);
  }

  componentWillUnmount() {
    AppStore.removeListener(AppStore.tag.CHANGE_DISPLAY, this.updateValue);
  }

  updateValue() {
    this.setState({ value: AppStore.getValue(this.props.id) });
  }

  onChange(event) {
    let value = event.target.value;
    AppActions.updateValue(value);

    // The user changed something
    AppActions.updateHasChanged();
  }

  render() {
    if (this.props.readOnly) {
      // don't display broken numbers
      const value = isNaN(this.state.value) ? "loading..." : this.state.value;
      return (
        <input
          type="number"
          className="form-control transparent-input no-spinners"
          name="coin"
          readOnly
          value={value}
        />
      );
    } else {
      return (
        <input
          type="number"
          className="form-control transparent-input no-spinners"
          placeholder="input amount..."
          name="coin"
          onChange={this.onChange.bind(this)}
          value={this.state.value}
        />
      );
    }
  }
}
