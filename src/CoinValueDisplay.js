import React, { Component } from 'react'
import { FormGroup, Input } from 'reactstrap'
import { Container, Row, Col } from 'reactstrap'
import AppStore from './stores/AppStore';
import * as AppActions from './actions/AppActions'
import * as utils from './utils'

class CoinValue extends Component {

  render() {
    return (
      <FormGroup>
        <Input
          type="number"
          name="coin"
          onChange={this.props.onValueChange}
          value={this.props.value}
        />
      </FormGroup>
    );
  }
}


export default class CoinValueDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftValue: AppStore.getLeftValue(),
      rightValue: AppStore.getRightValue(),
      price: AppStore.getPrice()
    }
  }

  componentWillMount() {
    AppStore.on(AppStore.tag.CHANGE_VALUES, this.updateLeftValue.bind(this));
    AppStore.on(AppStore.tag.CHANGE_VALUES, this.updateRightValue.bind(this));
    AppStore.on(AppStore.tag.CHANGE_VALUES, this.updatePrice.bind(this));
  }

  componentWillUnmount() {
    AppStore.removeListener(AppStore.tag.CHANGE_VALUES, this.updateLeftValue.bind(this));
    AppStore.removeListener(AppStore.tag.CHANGE_VALUES, this.updateRightValue.bind(this));
    AppStore.removeListener(AppStore.tag.CHANGE_VALUES, this.updatePrice.bind(this));
  }

  updateLeftValue() {
    this.setState({ leftValue: AppStore.getLeftValue() });
  }
  updateRightValue() {
    this.setState({ rightValue: AppStore.getRightValue() });
  }
  updatePrice() {
    this.setState({ price: AppStore.getPrice() });
  }

  onLeftValueChange(event) {
    let leftValue = event.target.value;
    let rightValue = utils.multiply(leftValue, this.state.price)
    this.setState({ leftValue })
    this.setState({ rightValue })
    AppActions.updateLeftValue(leftValue)
    AppActions.updateRightValue(rightValue)
  }
  onRightValueChange(event) {
    let rightValue = event.target.value;
    let leftValue = utils.divide(rightValue, this.state.price)
    this.setState({ rightValue })
    this.setState({ leftValue })
    AppActions.updateLeftValue(leftValue)
    AppActions.updateRightValue(rightValue)
  }

  render() {
    return (
      <Container>
        <Row>
          <Col xs="6">
            <CoinValue
            onValueChange={this.onLeftValueChange.bind(this)}
            value={this.state.leftValue}
            />
          </Col>
          <Col xs="6">
            <CoinValue
            onValueChange={this.onRightValueChange.bind(this)}
            value={this.state.rightValue}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}


// <Input
//   type="select"
//   name="select"
//   onChange={this.props.onCoinChange}
//   >
//   {options}
// </Input>
