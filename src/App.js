import React, { Component } from "react";
import ClipboardJS from "clipboard";
// Load css
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
// import components
import CoinNameInput from "./components/CoinNameInput";
import CoinValueInput from "./components/CoinValueInput";
import CalendarDisplay from "./components/CalendarDisplay";
import CopyLinkButton from "./components/CopyLinkButton";
import ExchangeButton from "./components/ExchangeButton";
import Footer from "./components/Footer";
import givethLogo from "./assets/giveth-white-min.png";
// API CALLS
import "./API/coinList";
// import './API/cm'
// import parameters
import params from "./params";
import "./giveth";
// Start component

new ClipboardJS(".btn");

const Header = props => (
  <header className="masthead mb-auto">
    <div className="inner">
      <h3 className="masthead-brand">{params.headerTitle}</h3>
      <nav className="nav nav-masthead justify-content-end">
        <a
          href={params.link1.href}
          className="nav-link slim-nav-text"
          style={{ fontWeight: 300, color: "#ffffff40" }}
        >
          {params.link1.name}
        </a>
      </nav>
    </div>
  </header>
);

class App extends Component {
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
            <div className="row mb-4">
              <div className="col text-center">
                <CalendarDisplay />
              </div>
            </div>

            <div className="row">
              <div className="col-12 col-sm-5">
                <CoinValueInput id={"left"} />
              </div>
              <div className="col-12 col-sm-2 text-center">
                <span className="equal-span">=</span>
              </div>
              <div className="col-12 col-sm-5">
                <CoinValueInput id={"right"} readOnly={true} />
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-12 col-sm-5">
                <CoinNameInput id={"left"} />
              </div>
              <div className="col-12 col-sm-2 text-center">
                <ExchangeButton />
              </div>
              <div className="col-12 col-sm-5">
                <CoinNameInput id={"right"} />
              </div>
            </div>

            <div className="row mb-4">
              <div className="col text-center">
                <CopyLinkButton />
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }
}

export default App;
