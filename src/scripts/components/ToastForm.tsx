/// <reference path="../main.d.ts" />

import * as React from "react";

interface ToastFormState {
  message: string;
}

export class ToastForm extends React.Component<{}, ToastFormState> {
  static characterLimit = 140;

  constructor() {
    super();
    this.state = { message: "" };
  }

  handleMessageChange(e: React.FormEvent) {
    var textarea = e.target as HTMLTextAreaElement;
    this.setState((s, p) => {
      s.message = textarea.value;
      return s;
    });
  }

  handleMessageKeyDown(e: React.KeyboardEvent) {
    // Send on Enter.
    if (e.keyCode === 13) {
      e.preventDefault();
      this.handleSend();
    }
  }

  handleSend() {
    if (!this.canSend()) {
      return;
    }
    this.setState((s, p) => {
      s.message = "";
      return s;
    });
  }

  canSend() {
    var remaining = this.charactersRemaining();
    return 0 <= remaining && remaining < ToastForm.characterLimit;
  }

  charactersRemaining() {
    return ToastForm.characterLimit - this.state.message.length;
  }

  render() {
    return <div id="toast-form">
      <div id="message-box">
        <textarea  onChange={ e => this.handleMessageChange(e) } onKeyDown={ e => this.handleMessageKeyDown(e) }
          value={ this.state.message }></textarea>
        <span id="characters-remaining" className={ this.charactersRemaining() < 0 ? "negative" : "" }>
          {this.charactersRemaining() }
        </span>
      </div>
      <button id="send" onClick={ e => this.handleSend() }
        disabled={ !this.canSend() }>
        <span className="icon-send"></span> <span>Send</span>
      </button>
    </div>;
  }
}
