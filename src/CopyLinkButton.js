import queryString from 'query-string'
import React, { Component } from 'react'
import AppStore from './stores/AppStore'
import linkIcon from './assets/link.svg'


export default class CopyLinkButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      left: AppStore.getName('left'),
      right: AppStore.getName('right'),
      timestamp: AppStore.getTimestamp(),
      value: AppStore.getValue('left')
    }
    this.updateLeft = this.updateLeft.bind(this)
    this.updateRight = this.updateRight.bind(this)
    this.updateTimestamp = this.updateTimestamp.bind(this)
    this.updateValue = this.updateValue.bind(this)
  }

  componentWillMount() {
    AppStore.on(AppStore.tag.CHANGE_DISPLAY, this.updateLeft);
    AppStore.on(AppStore.tag.CHANGE_DISPLAY, this.updateRight);
    AppStore.on(AppStore.tag.CHANGE_DISPLAY, this.updateTimestamp);
    AppStore.on(AppStore.tag.CHANGE_DISPLAY, this.updateValue);
  }

  componentWillUnmount() {
    AppStore.removeListener(AppStore.tag.CHANGE_DISPLAY, this.updateLeft);
    AppStore.removeListener(AppStore.tag.CHANGE_DISPLAY, this.updateRight);
    AppStore.removeListener(AppStore.tag.CHANGE_DISPLAY, this.updateTimestamp);
    AppStore.removeListener(AppStore.tag.CHANGE_DISPLAY, this.updateValue);
  }

  updateLeft() {
    this.setState({ left: AppStore.getName('left') })
  }
  updateRight() {
    this.setState({ right: AppStore.getName('right') })
  }
  updateTimestamp() {
    this.setState({ timestamp: AppStore.getTimestamp() })
  }
  updateValue() {
    this.setState({ value: AppStore.getValue('left') })
  }

  render() {
    const stringified = queryString.stringify({
      l: this.state.left,
      r: this.state.right,
      t: this.state.timestamp,
      v: this.state.value
    })
    const url = window.location.origin + window.location.pathname + '?' + stringified;

    if (false) {
      return (
        null
      );
    } else {
      return (
        <button className="btn copy-button" data-clipboard-text={url}>
          <img src={linkIcon} alt="" className="link-icon"/>
          Copy link
        </button>
      );
    }
  }
}
