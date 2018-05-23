import React, { Component } from 'react';
// Load css
import 'bootstrap/dist/css/bootstrap.min.css'
import 'semantic-ui-css/semantic.min.css'
import './App.css'
// import components
import CoinListDisplays from './CoinListDisplays';
import CoinValueDisplay from './CoinValueDisplay';
import CalendarDisplay from './CalendarDisplay';
import { Container } from 'reactstrap';
// API CALLS
import './API/coinList'
// import parameters
import params from './params'
// Start component


class App extends Component {
  constructor() {
    super();
    this.state = {
      leftCoin: 'EUR',
      rightCoin: 'ETH',
      leftCoinOptions: ['EUR'],
      rightCoinOptionsObject: {'EUR': ['ETH']},
      price: 1,
      timestamp: 1523970767,
      markets: {'EUR-ETH': true}
    }
  }

  // componentDidMount() {
  //   this.computePrice(this.state.leftCoin, this.state.rightCoin, this.state.timestamp)
  // }

  onLeftCoinChange(leftCoin) {
    this.setState({ leftCoin })
    this.computePrice(leftCoin, this.state.rightCoin, this.state.timestamp)

  }
  onRightCoinChange(rightCoin) {
    this.setState({ rightCoin })
    this.computePrice(this.state.leftCoin, rightCoin, this.state.timestamp)
  }

  render() {
    return (
      <div className="App">
          <div className="ui inverted vertical masthead center aligned segment main">
            <div className="ui text container">
              <Container>
                <h1 className="ui inverted header">{params.title}</h1>
                <h3>{params.subtitle}</h3>
                <CalendarDisplay />
                <CoinValueDisplay
                  price={this.state.price}
                />
                <CoinListDisplays
                  price={this.state.price}
                />
              </Container>
            </div>
          </div>
      </div>
    );
  }
}



export default App;
