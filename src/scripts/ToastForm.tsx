/// <reference path="../../typings/index.d.ts" />

import * as React from "react";

interface ToastFormState {
  charactersRemaining: number;
}

export class ToastForm extends React.Component<{}, ToastFormState> {
  private static characterLimit = 140;

  constructor() {
    super();
    this.state = { charactersRemaining: ToastForm.characterLimit };
  }

  handleMessageChange(e: React.FormEvent) {
    var textarea = e.target as HTMLTextAreaElement;
    this.setState((s, p) => {
      s.charactersRemaining = ToastForm.characterLimit - textarea.value.length;
      return s;
    });
  }

  render() {
    return <div id="toast-form">
      <div id="message-box">
        <textarea onChange={e => this.handleMessageChange(e) }></textarea>
        <span id="characters-remaining" className={this.state.charactersRemaining < 0 ? "negative" : ""}>
          {this.state.charactersRemaining}
        </span>
      </div>
    </div>
  }
}
