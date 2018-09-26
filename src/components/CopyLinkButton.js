import React, { Component } from "react";
import linkIcon from "../assets/link.svg";
import { queryToUrl } from "../utils";

export default class CopyLinkButton extends Component {
  render() {
    const url =
      window.location.origin +
      window.location.pathname +
      queryToUrl(this.props.query);

    return (
      <div
        className={
          "copy-button-js " + (this.props.showCopyButton ? "active" : "")
        }
      >
        <button className="btn copy-button" data-clipboard-text={url}>
          <img src={linkIcon} alt="" className="link-icon" />
          Copy link
        </button>
      </div>
    );
  }
}
