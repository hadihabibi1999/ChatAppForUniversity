import React, { Component } from "react";

class EachChannel extends Component {
  state = {
    unseen: this.props.unseenCount,
  };
  handleUnseen = () => {
    const { unseen } = this.state;
    return unseen === "0" ? null : unseen;
  };
  handleUIofUnseen = () => {
    let style = "";
    style += this.state.unseen === "0" ? null : "unseen-count";
    return style;
  };
  render() {
    return (
      <ul>
        <li onClick={() => this.props.onClick(this.props.id)} class="total">
          <div class="profile total-channel">
            <img class="image-profile" src="./assets/3.JPG" alt="profile" />
            <div class="details">
              <h3 class="title">{this.props.title}</h3>
              <p class="subTitle">{this.props.subTitle}</p>
            </div>
          </div>
          <span class={this.handleUIofUnseen()}>{this.handleUnseen()}</span>
        </li>
      </ul>
    );
  }
}

export default EachChannel;
