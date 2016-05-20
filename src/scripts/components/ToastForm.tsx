/// <reference path="../main.d.ts" />

import * as React from "react";
import { ToastClient } from "../ToastClient";

interface ToastFormProps {
  toastClient: ToastClient;
  loggedIn: boolean;
}

interface ToastFormState {
  to: string;
  message: string;
}

export class ToastForm extends React.Component<ToastFormProps, ToastFormState> {
  static CHARACTER_LIMIT = 140;

  constructor() {
    super();
    this.state = { to: "", message: "" };
  }

  private get canSend() {
    var remaining = this.charactersRemaining;
    return this.props.loggedIn
      && this.state.to.length > 0
      && (0 <= remaining && remaining < ToastForm.CHARACTER_LIMIT);
  }

  private get charactersRemaining() {
    return ToastForm.CHARACTER_LIMIT - this.state.message.length;
  }

  private handleToChange(e: React.FormEvent) {
    var input = e.target as HTMLInputElement;
    this.setState(s => {
      s.to = input.value;
      return s;
    });
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
    this.props.toastClient.sendToast(this.state.to, this.state.message);
    this.setState(s => {
      s.to = "";
      s.message = "";
      return s;
    });
  }

  render() {
    return <form id="toast-form">
      <div id="to-box">
        <span>TO</span>
        <input type="text" className="toast-input" onChange={ e => this.handleToChange(e) } value={ this.state.to } />
      </div>
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
    </form>;
  }
}
