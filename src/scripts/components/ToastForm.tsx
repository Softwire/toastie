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
  private toBox: HTMLInputElement;
  private messageBox: HTMLTextAreaElement;

  constructor() {
    super();
    this.state = { to: "", message: "" };
  }

  private get canSendToast() {
    return this.props.loggedIn && this.validToField && this.validMessageField;
  }

  private get validToField() {
    return this.state.to.trim().length > 0;
  }

  private get validMessageField() {
    var remaining = this.charactersRemaining;
    return 0 <= remaining && remaining < ToastForm.CHARACTER_LIMIT;
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

  private handleSubmit(e: React.FormEvent) {
    this.trySendToast();
    e.preventDefault();
    return false;
  }

  private handleMessageKeyDown(e: React.KeyboardEvent) {
    // Send on Enter.
    if (e.keyCode === 13) {
      this.trySendToast();
      e.preventDefault();
    }
  }

  private trySendToast() {
    if (!this.canSendToast) {
      if (!this.validToField) {
        this.toBox.focus();
      } else if (!this.validMessageField) {
        this.messageBox.focus();
      }
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
    var tabIndex = this.props.loggedIn ? "" : "-1";
    return <form id="toast-form" action="send-toast" onSubmit={ e => this.handleSubmit(e) }>
      <div id="to-box">
        <span>TO</span>
        <input type="text" className="toast-input" tabIndex={ tabIndex } value={ this.state.to }
          ref={ ref => this.toBox = ref }
          autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"
          onChange={ e => this.handleToChange(e) }/>
      </div>
      <div id="message-box">
        <textarea className="toast-input" tabIndex={ tabIndex } value={ this.state.message }
          ref={ ref => this.messageBox = ref }
          onChange={ e => this.handleMessageChange(e) } onKeyDown={ e => this.handleMessageKeyDown(e) }></textarea>
        <span id="characters-remaining" className={ this.charactersRemaining < 0 ? "negative" : "" }>
          { this.charactersRemaining }
        </span>
      </div>
      <div id="send">
        <button className="toast-btn" type="submit" disabled={ !this.canSendToast }>
          <span className="icon-send"></span> <span>Send</span>
        </button>
      </div>
    </form>;
  }
}
