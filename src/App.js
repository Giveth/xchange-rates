import React from "react";
import ClipboardJS from "clipboard";
// Load css
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
// import components
import CoinNameInput from "./components/CoinNameInput";
import CalendarDisplay from "./components/CalendarDisplay";
import CopyLinkButton from "./components/CopyLinkButton";
import ExchangeButton from "./components/ExchangeButton";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LoaderImg from "./assets/loader-dots.gif";
import givethLogo from "./assets/giveth-white-min.png";
// import './API/cm'
// import parameters

import "./giveth";
// Start component
import * as utils from "./utils";
import * as a from "./actions";
import { connect } from "react-redux";
import moment from "moment";

new ClipboardJS(".btn");

class App extends React.PureComponent {
  componentWillMount() {
    // On startup, fetch info
    this.props.fetchMarkets();
  }

  render() {
    return (
      <div className="cover-container d-flex h-100 p-3 mx-auto flex-column">
        <Header />

        <main role="main" className="inner cover">
          <h1 className="cover-heading text-center">
            XCHAN
            <img src={givethLogo} alt="" className="header-icon" />E RATES
          </h1>
          <div className="container">
            <div className="row">
              {/* Left Value */}
              <div className="col-12 col-sm-5">
                <input
                  type="number"
                  className="form-control transparent-input no-spinners"
                  onChange={e => this.props.updateValue(e.target.value)}
                  value={this.props.leftValue}
                />
              </div>

              {/* Middle icon, equal */}
              <div className="col-12 col-sm-2 text-center">
                <span className="equal-span">=</span>
              </div>

              {/* Right value */}
              <div className="col-12 col-sm-5">
                <input
                  className="form-control transparent-input no-spinners"
                  readOnly
                  value={this.props.rightValue}
                />
              </div>
            </div>

            <div className="row mb-4">
              {/* Left name */}
              <div className="col-12 col-sm-5">
                <CoinNameInput
                  name={this.props.leftName}
                  options={this.props.leftOptions}
                  onNameChange={this.props.updateLeftName}
                />
              </div>

              {/* Middle icon, exchange */}
              <div className="col-12 col-sm-2 text-center">
                <ExchangeButton exchange={this.props.exchange} />
              </div>

              {/* Right name */}
              <div className="col-12 col-sm-5">
                <CoinNameInput
                  name={this.props.rightName}
                  options={this.props.rightOptions}
                  onNameChange={this.props.updateRightName}
                />
              </div>
            </div>

            {/* Calendar */}
            <div className="row mb-4">
              <div className="col text-center">
                <CalendarDisplay
                  date={this.props.date}
                  onDateChange={this.props.onDateChange}
                />
              </div>
            </div>

            {/* Copy link button */}
            <div className="row mb-4">
              <div className="col text-center" style={{ height: "100px" }}>
                {this.props.loading ? (
                  <img
                    src={LoaderImg}
                    width="100"
                    alt="loader"
                    style={{ opacity: this.props.loading ? 1 : 0 }}
                  />
                ) : (
                  <CopyLinkButton
                    showCopyButton={this.props.showCopyButton}
                    query={this.props.query}
                  />
                )}
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const price = state.data.price || "";
  let rightValue;
  if (price === "Error") {
    rightValue = price;
  } else if (isNaN(price)) {
    rightValue = "loading...";
  } else {
    rightValue = utils.multiply(state.query.value, price);
  }
  return {
    date: moment.unix(state.query.timestamp),
    leftValue: state.query.value,
    rightValue,
    leftName: state.query.left,
    rightName: state.query.right,
    leftOptions: state.data.leftOptions,
    rightOptions: state.data.rightOptions,
    showCopyButton: state.data.showCopyButton,
    query: state.query,
    loading: state.data.loading
  };
};

const mapDispatchToProps = dispatch => ({
  updateValue: value => {
    dispatch(a.updateValue(value));
  },
  updateLeftName: name => {
    dispatch(a.updateLeft(name));
  },
  updateRightName: name => {
    dispatch(a.updateRight(name));
  },
  fetchMarkets: () => {
    dispatch(a.fetchMarkets());
  },
  exchange: () => {
    dispatch(a.exchange());
  },
  onDateChange: date => {
    console.log("date change", date);
    const timestamp = date
      .startOf("date")
      .add(12, "hours")
      .unix();
    dispatch(a.updateTimestamp(timestamp));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
