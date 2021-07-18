import React, { Component } from "react";
import { create } from "apisauce";
import ReactLoading from "react-loading";
import archiveAPI from "./Archive";

import { PDFReader } from "react-read-pdf";
import { Document, Page } from "react-pdf";
import { BsCardImage } from "react-icons/bs";
import { GrDocumentPdf } from "react-icons/gr";
import { MdSettingsVoice } from "react-icons/md";
import { AiOutlineFile } from "react-icons/ai";
import { IoMdMusicalNote } from "react-icons/io";

class EachMessage extends Component {
  state = {
    archive: this.props.archive,
    fileID: this.props.fileID,
    comment: this.props.comment,
    eachID: {},
    image: [],
    bool: false,
    loading: false,
    session: "",
    class: "icon",
  };
  icon = () => {
    return this.state.archive.map((e) =>
      e == "jpg" ? (
        <BsCardImage
          onClick={() => this.clicking()}
          key={e.archive__id}
          class="icon"
        />
      ) : null || e == "pdf" ? (
        <GrDocumentPdf key={e.archive__id} class="icon" />
      ) : null || e == "amr" ? (
        <MdSettingsVoice key={e.archive__id} class="icon " />
      ) : null || e == "mp3" ? (
        <IoMdMusicalNote
          onClick={() => this.clickingAudio()}
          key={e.archive__id}
          class={this.state.class}
        />
      ) : null || e == "" ? null : (
        <AiOutlineFile key={e.archive__id} class="icon" />
      )
    );
  };

  clicking = () => {
    this.setState({ bool: true });
    this.handle();
  };

  clickingAudio = () => {
    this.handle();
    this.setState({ class: "none" });
  };

  handle = async () => {
    this.setState({ loading: true });
    let token = await archiveAPI.post().then();
    this.setState({ session: token.data.data.session });
    let response = create({
      baseURL: this.props.fileID.map(
        (e) =>
          `http://archive.atiehsazan.ir/Api/GetFile/?Session_id=${this.state.session}&File_id=${e}`
      ),
    });
    let result = await response.get().then();
    this.setState({ image: result.config.baseURL });
    this.setState({ loading: false });
  };

  imgRender = (i) => {
    let src = this.state.image[i];

    return src == undefined ? null : <img class="attachments" src={src} />;
  };

  audioRender = () => {
    let src = this.state.image[0];
    return src == undefined ? null : (
      <audio class="attach-audio" controls>
        {" "}
        <source src={src} />
      </audio>
    );
  };

  pdfRender = (i) => {
    let src = this.state.image[i];
    return src == undefined ? null : (
      <a target="_blank" href={src}>
        pdf
      </a>
    );
  };

  render() {
    return (
      <>
        {console.log(this.state.comment)}
        <div class="each-mess">
          <div class="each-text">{this.props.text}</div>

          {this.state.loading && <ReactLoading type="cylon" color="#33CEFF" />}

          {!this.state.loading && (
            <div class="attach-images">
              {!this.state.bool && this.icon()}
              {(this.state.bool && this.imgRender(0)) || this.audioRender(0)}
              {this.state.bool && this.imgRender(1)}
              {this.state.bool && this.imgRender(2)}
              {this.state.bool && this.imgRender(3)}
            </div>
          )}
          <p style={{ color: "red" }}>
            Comments:{" "}
            <span style={{ color: "blue" }}>{this.state.comment}</span>
          </p>
        </div>
      </>
    );
  }
}

export default EachMessage;
