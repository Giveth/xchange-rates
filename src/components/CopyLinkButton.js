import React, { Component } from 'react'
import querystring from 'querystring'
import AppStore from '../stores/AppStore'
import linkIcon from '../assets/link.svg'


export default class CopyLinkButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      left: AppStore.getName('left'),
      right: AppStore.getName('right'),
      timestamp: AppStore.getTimestamp(),
      value: AppStore.getValue('left'),
      tag: (window.location.search.replace('?','').replace(' ','') === '') ? 'Copy' : 'Copy updated',
      hasChanged: AppStore.getHasChanged()
    }
    this.updateLeft = this.updateLeft.bind(this)
    this.updateRight = this.updateRight.bind(this)
    this.updateTimestamp = this.updateTimestamp.bind(this)
    this.updateValue = this.updateValue.bind(this)
    this.updateHasChanged = this.updateHasChanged.bind(this)
  }

  componentWillMount() {
    AppStore.on(AppStore.tag.CHANGE_DISPLAY, this.updateLeft);
    AppStore.on(AppStore.tag.CHANGE_DISPLAY, this.updateRight);
    AppStore.on(AppStore.tag.CHANGE_DISPLAY, this.updateTimestamp);
    AppStore.on(AppStore.tag.CHANGE_DISPLAY, this.updateValue);
    AppStore.on(AppStore.tag.CHANGE_DISPLAY, this.updateHasChanged);
  }

  componentWillUnmount() {
    AppStore.removeListener(AppStore.tag.CHANGE_DISPLAY, this.updateLeft);
    AppStore.removeListener(AppStore.tag.CHANGE_DISPLAY, this.updateRight);
    AppStore.removeListener(AppStore.tag.CHANGE_DISPLAY, this.updateTimestamp);
    AppStore.removeListener(AppStore.tag.CHANGE_DISPLAY, this.updateValue);
    AppStore.removeListener(AppStore.tag.CHANGE_DISPLAY, this.updateHasChanged);
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
  updateHasChanged() {
    this.setState({ hasChanged: AppStore.getHasChanged() })
  }

  generateUrl() {
    const stringified = querystring.stringify({
      l: this.state.left,
      r: this.state.right,
      t: this.state.timestamp,
      v: this.state.value
    })
    return window.location.origin + window.location.pathname + '?' + stringified;
  }

  showUrl() {
    console.log('COPIED URL: ',this.generateUrl())
  }

  render() {
    const url = this.generateUrl()

    return (
      <div className={"copy-button-js "+(this.state.hasChanged ? 'active' : '')}>
        <button className="btn copy-button" data-clipboard-text={url}
          onClick={this.showUrl.bind(this)}
        >
          <img src={linkIcon} alt="" className="link-icon"/>
          {this.state.tag+' link'}
        </button>
      </div>
    );
  }
}
