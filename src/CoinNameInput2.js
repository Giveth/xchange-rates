import React, { Component } from 'react'
import VirtualizedSelect from 'react-virtualized-select';
import * as AppActions from './actions/AppActions'
import AppStore from './stores/AppStore'
import getPrice from './API/price';

import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'

// This component receive lists of options
// and updates the user's coin selection

export default class CoinNameInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: AppStore.getOptions(this.props.id),
      name: AppStore.getName(this.props.id)
    }
    this.updateOptions = this.updateOptions.bind(this)
    this.updateName = this.updateName.bind(this)
  }

  componentWillMount() {
    AppStore.on(AppStore.tag.CHANGE_OPTIONS[this.props.id], this.updateOptions);
    AppStore.on(AppStore.tag.CHANGE_NAME[this.props.id], this.updateName);
  }

  componentWillUnmount() {
    AppStore.removeListener(AppStore.tag.CHANGE_OPTIONS[this.props.id], this.updateOptions);
    AppStore.removeListener(AppStore.tag.CHANGE_NAME[this.props.id], this.updateName);
  }

  updateOptions() {
    this.setState({ options: AppStore.getOptions(this.props.id) })
  }

  updateName() {
    this.setState({ name: AppStore.getName(this.props.id) })
  }

  onNameChange(newValue) {
    AppActions.updateName(newValue, this.props.id)

    // Fetch new price
    let req = {}
    req[this.props.id] = newValue
    getPrice(req).then(price => {
      console.log('REQ price from CoinNameInput2-'+this.props.id+': ',price)
      AppActions.updatePrice(price)
    })

    // The user changed something
    AppActions.updateHasChanged()
  }

  render() {
    let options = this.state.options || ['none']
    if (!Array.isArray(options)) throw Error ('options is not an array ',options)

    let optionsFormated = options.map(coin => {
      return { name: coin }
    })
    return (
			<VirtualizedSelect ref="coinSelect"
				options={optionsFormated}
				simpleValue
				clearable={false}
				className={"transparent-dropdown"}
				name="select-coin"
				value={this.state.name}
				onChange={this.onNameChange.bind(this)}
				searchable
				labelKey="name"
				valueKey="name"
			/>
    );
  }
}
