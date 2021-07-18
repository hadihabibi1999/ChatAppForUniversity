import React, { Component } from "react";

import receivingChannels from "./HandleAPIs";
import EachChannel from "./EachChannel";

import { create } from "apisauce";
import EachMessage from "./EachMessage";
import { BsBackspace } from "react-icons/bs";

class Part2 extends Component {
  state = {
    channelss: [],
    mess: [],
    bool: false,
    bool2: true,
    visible: "secound-part",
  };

  loadTheList = async () => {
    const response = await receivingChannels.getList().then();
    this.state.channelss.push(response.data.data.list_channel);
    this.setState({});
  };

  componentDidMount() {
    this.loadTheList();
  }

  handleApi = async (id) => {
    this.setState({ bool: true });
    this.setState({ visible: "secound-part unvisible" });
    this.setState({ mess: [] });
    let api2Client = create({
      baseURL:
        "http://p4.maktabsoft.ir/7070/db_android.php?active_user=3C962B18005BC3C449A0297608F48C52&app_version=12.3.19&channel__id=" +
        id +
        "&status=get_news_channel",
    });
    let response = await api2Client.get().then();
    this.state.mess.push(response.data.data.list_news);
    this.setState({});
  };

  backButton = () => {
    this.setState({ bool: false });
    this.setState({ visible: "secound-part" });
  };
  render() {
    return (
      <>
        {!this.state.bool && (
          <div class="first-part unvisible demo">یک کانال انتخاب کنید</div>
        )}
        {this.state.bool && (
          <div class="first-part">
            <button class="back-button" onClick={() => this.backButton()}>
              back
            </button>

            {this.state.mess.map((l) =>
              l.map((e) => (
                <EachMessage
                  key={e.news__id}
                  text={e.description}
                  archive={e.list_archive.map((i) => i.file_type)}
                  fileID={e.list_archive.map(i=>i.file__id)}
                  comment={e.count_comment}
                />
              ))
            )}
          </div>
        )}

        <div class={this.state.visible} id="secound-part">
          {this.state.channelss.map((e) =>
            e.map((l) => (
              <EachChannel
                title={l.channel_name}
                subTitle={l.description}
                id={l.channel__id}
                key={l.channel__id}
                unseenCount={l.count_news_new}
                onClick={this.handleApi}
                image={l.image_channel}
              />
            ))
          )}
        </div>
      </>
    );
  }
}

export default Part2;
