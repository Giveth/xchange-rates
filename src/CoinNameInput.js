import React, { Component } from 'react'
import { Dropdown } from 'semantic-ui-react'
import * as AppActions from './actions/AppActions'
import AppStore from './stores/AppStore'

// This component receive lists of options
// and updates the user's coin selection

export default class CoinNameInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: AppStore.getOptions(this.props.id),
      defaultName: AppStore.getName(this.props.id)
    }
    this.updateOptions = this.updateOptions.bind(this)
  }

  componentWillMount() {
    AppStore.on(AppStore.tag.CHANGE_OPTIONS[this.props.id], this.updateOptions);
  }

  componentWillUnmount() {
    AppStore.removeListener(AppStore.tag.CHANGE_OPTIONS[this.props.id], this.updateOptions);
  }

  updateOptions() {
    this.setState({ options: AppStore.getOptions(this.props.id) })
  }

  handleChange = (e, { name, value }) => {
    AppActions.updateName(value, this.props.id)
  }

  render() {
    let options = this.state.options || ['none']
    let optionsSemanticUI = options.map(coin => {
      return { key: coin, value: coin, text: coin }
    })
    return (
      <div>
        <Dropdown placeholder="i.e. BTC" fluid search selection
        className={"transparent-dropdown"}
        onChange={this.handleChange.bind(this)}
        options={optionsSemanticUI}
        defaultValue={this.state.defaultName}
        />
      </div>
    );
  }
}
