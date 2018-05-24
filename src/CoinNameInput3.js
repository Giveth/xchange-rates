import React from 'react';
import createClass from 'create-react-class';
import VirtualizedSelect from 'react-virtualized-select';

import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'

const DATA = require('./cities');

var CitiesField = createClass({
	displayName: 'CitiesField',
	getInitialState () {
		return {};
	},
	updateValue (newValue) {
		this.setState({
			selectValue: newValue
		});
	},
	render () {
		var options = DATA.CITIES;
		return (
			<div className="section">
				<h3 className="section-heading">Cities (Large Dataset) <a href="https://github.com/JedWatson/react-select/tree/master/examples/src/components/Virtualized.js">(Source)</a></h3>
				<VirtualizedSelect ref="citySelect"
					options={options}
					simpleValue
					clearable
					name="select-city"
					value={this.state.selectValue}
					onChange={this.updateValue}
					searchable
					labelKey="name"
					valueKey="name"
				/>
				<div className="hint">
					Uses <a href="https://github.com/bvaughn/react-virtualized">react-virtualized</a> and <a href="https://github.com/bvaughn/react-virtualized-select/">react-virtualized-select</a> to display a list of the worlds 1,000 largest cities.
				</div>
			</div>
		);
	}
});

export default CitiesField;
