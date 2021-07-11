import React, { Component } from "react";

import receivingChannels from "./HandleAPIs";
import EachChannel from "./EachChannel";

import { create } from "apisauce";
import EachMessage from "./EachMessage";

class Part2 extends Component {
  state = {
    channelss: [],
    mess: [],
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

  render() {
    return (
      <>
        <div class="first-part">
          {this.state.mess.map((l) =>
            l.map((e) => <EachMessage key={e.news__id} text={e.description} />)
          )}
        </div>
        <div class="secound-part" id="secound-part">
          {this.state.channelss.map((e) =>
            e.map((l) => (
              <EachChannel
                title={l.channel_name}
                subTitle={l.description}
                id={l.channel__id}
                key={l.channel__id}
                unseenCount={l.count_news_new}
                onClick={this.handleApi}
              />
            ))
          )}
        </div>
      </>
    );
  }
}

export default Part2;
