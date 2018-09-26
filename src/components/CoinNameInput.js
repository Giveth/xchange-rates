import React from "react";
import VirtualizedSelect from "react-virtualized-select";

import "react-select/dist/react-select.css";
import "react-virtualized/styles.css";
import "react-virtualized-select/styles.css";

// This component receive lists of options
// and updates the user's coin selection

export default class CoinNameInput extends React.PureComponent {
  render() {
    let options = this.props.options || ["none"];
    if (!Array.isArray(options)) {
      options = ["error"];
      console.error("options is not an array ", options);
    }

    return (
      <VirtualizedSelect
        ref="coinSelect"
        options={options.map(coin => ({ name: coin }))}
        simpleValue
        clearable={false}
        className={"transparent-dropdown"}
        name="select-coin"
        value={this.props.name}
        onChange={this.props.onNameChange}
        searchable
        labelKey="name"
        valueKey="name"
      />
    );
  }
}
