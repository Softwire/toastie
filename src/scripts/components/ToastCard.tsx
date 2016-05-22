/// <reference path="../main.d.ts" />

import * as React from "react";
import { HashtagCarousel } from "./HashtagCarousel";
import { Toast } from "../models/Toast";
import { ToastClient } from "../ToastClient";

interface ToastCardProps {
  toast: Toast;
  toastClient: ToastClient;
  username: string;
}

export class ToastCard extends React.Component<ToastCardProps, {}> {
  private static HASHTAG_PATTERN = /\B#\w*[a-zA-Z0-9_]\w*\b(?!#)/g;

  private get hashtags(): string[] {
    return this.props.toast.message.match(ToastCard.HASHTAG_PATTERN) || [];
  }

  private get toastees(): string[] {
    return this.props.toast.to.split(",").map(r => r.trim());
  }

  private get userWasToasted(): boolean {
    return this.toastees.indexOf(this.props.username) !== -1;
  }

  render() {
    return <div className={ `toast-card${this.userWasToasted ? " toast-to-me" : ""}` }>
      <div className="header">
        <div>{ this.props.toast.from }</div>
        <div className="toasted">
          <span className="icon-toasted"></span>
        </div>
        <div>{ this.toastees.join(", ") }</div>
      </div>
      <div className="toast-body">
        <div className="toast-image">
          <HashtagCarousel hashtags={ this.hashtags } toastClient={ this.props.toastClient }/>
        </div>
        <div className="message-body">
          <div className="message">
            { this.props.toast.message }
          </div>
          <div className="timestamp">
            { new Date(this.props.toast.timestamp).toLocaleString() }
          </div>
        </div>
      </div>
    </div>;
  }
}
