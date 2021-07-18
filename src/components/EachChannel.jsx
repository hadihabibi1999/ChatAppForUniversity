import React, { Component } from "react";
import archiveAPI from "./Archive";
import { create } from "apisauce";

class EachChannel extends Component {
  state = {
    unseen: this.props.unseenCount,
    session: "",
    image: [],
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

  handle = async () => {
    let token = await archiveAPI.post().then();
    this.setState({ session: token.data.data.session });
    let response = create({
      baseURL: `http://archive.atiehsazan.ir/Api/GetFile/?Session_id=${this.state.session}&File_id=${this.props.image}`,
    });
    let result = await response.get().then();
    this.setState({ image: result.config.baseURL });
  };
  componentDidMount() {
    this.handle();
  }
  showImage = () => {
    return this.props.image == "" ? "/assets/profile.png" : this.state.image;
  };
  render() {
    return (
      <ul>
        <li onClick={() => this.props.onClick(this.props.id)} class="total">
          <div class="profile total-channel">
            <img class="image-profile" src={this.showImage()} alt="..." />
            <div class="details">
              <h3 class="title">{this.props.title}</h3>
              <p class="subTitle">{this.props.subTitle}</p>
            </div>
          </div>
          <span class={this.handleUIofUnseen()}>{this.handleUnseen()}</span>
        </li>
      {/*   {console.log(this.props.id)} */}
      </ul>
    );
  }
}

export default EachChannel;
