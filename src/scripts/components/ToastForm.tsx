/// <reference path="../main.d.ts" />

import * as React from "react";
import { ToastClient } from "../ToastClient";

interface ToastFormState {
  message: string;
}

export class ToastForm extends React.Component<{}, ToastFormState> {
  static CHARACTER_LIMIT = 140;

  constructor() {
    super();
    this.state = { message: "" };
  }

  private get canSend() {
    var remaining = this.charactersRemaining;
    return 0 <= remaining && remaining < ToastForm.CHARACTER_LIMIT;
  }

  private get charactersRemaining() {
    return ToastForm.CHARACTER_LIMIT - this.state.message.length;
  }

  private handleMessageChange(e: React.FormEvent) {
    var textarea = e.target as HTMLTextAreaElement;
    this.setState(s => {
      s.message = textarea.value;
      return s;
    });
  }

  private handleMessageKeyDown(e: React.KeyboardEvent) {
    // Send on Enter.
    if (e.keyCode === 13) {
      e.preventDefault();
      this.handleSend();
    }
  }

  private handleSend() {
    if (!this.canSend) {
      return;
    }
    ToastClient.sendToast(this.state.message);
    this.setState(s => {
      s.message = "";
      return s;
    });
  }

  render() {
    return <div id="toast-form">
      <div id="message-box">
        <textarea className="toast-input" onChange={ e => this.handleMessageChange(e) } onKeyDown={ e => this.handleMessageKeyDown(e) }
          value={ this.state.message }></textarea>
        <span id="characters-remaining" className={ this.charactersRemaining < 0 ? "negative" : "" }>
          { this.charactersRemaining }
        </span>
      </div>
      <div id="send">
        <button className="toast-btn" onClick={ e => this.handleSend() }
          disabled={ !this.canSend }>
          <span className="icon-send"></span> <span>Send</span>
        </button>
      </div>
    </div>;
  }
}
