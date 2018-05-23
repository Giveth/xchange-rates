import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import AppStore from './stores/AppStore'
import { FormGroup } from 'reactstrap'
import { Dropdown } from 'semantic-ui-react'
import * as AppActions from './actions/AppActions'
import params from './params'

// This component receive lists of options
// and updates the user's coin selection

class CoinListDisplay extends Component {
  handleChange = (e, { name, value }) => this.props.onCoinChange(value)

  render() {
    let options = this.props.options || ['none']
    let optionsSemanticUI = options.map(coin => {
      return { key: coin, value: coin, text: coin }
    })
    return (
      <FormGroup>
        <Dropdown placeholder={this.props.defaultValue} fluid search selection
        onChange={this.handleChange}
        options={optionsSemanticUI}
        defaultValue={this.props.defaultValue}
        />
      </FormGroup>
    );
  }
}

export default class CoinListDisplays extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftOptions: AppStore.getLeftOptions(),
      rightOptions: AppStore.getRightOptions()
    }
  }

  componentWillMount() {
    AppStore.on("CHANGE_LEFT_OPTIONS", this.updateLeftOptions.bind(this));
    AppStore.on("CHANGE", this.updateRightOptions.bind(this));
  }

  componentWillUnmount() {
    AppStore.removeListener("CHANGE_LEFT_OPTIONS", this.updateLeftOptions.bind(this));
    AppStore.removeListener("CHANGE", this.updateRightOptions.bind(this));
  }

  updateLeftOptions() {
    this.setState({ leftOptions: AppStore.getLeftOptions() });
  }
  updateRightOptions() {
    this.setState({ rightOptions: AppStore.getRightOptions() });
  }


  onLeftCoinChange(leftCoin) {
    AppActions.updateLeftCoin(leftCoin)
  }
  onRightCoinChange(rightCoin) {
    AppActions.updateRightCoin(rightCoin)
  }

  render() {
    return (
      <div>
        <CoinListDisplay
        options={this.state.leftOptions}
        onCoinChange={this.onLeftCoinChange.bind(this)}
        defaultValue={params.leftCoin}
        />
      </div>
    );
  }
}
