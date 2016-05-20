/// <reference path="../main.d.ts" />

import * as React from "react";
import { HashtagCarousel } from "./HashtagCarousel";
import { Toast } from "../models/Toast";
import { ToastClient } from "../ToastClient";

interface ToastCardProps {
  toast: Toast;
  toastClient: ToastClient;
}

export class ToastCard extends React.Component<ToastCardProps, {}> {
  private static HASHTAG_PATTERN = /\B#\w*[a-zA-Z0-9_]\w*\b(?!#)/g;

  private get hashtags(): string[] {
    return this.props.toast.message.match(ToastCard.HASHTAG_PATTERN) || [];
  }

  render() {
    return <div className="toast-card">
      <div className="header">
        <div>{ this.props.toast.from }</div>
        <div className="toasted">
          <span className="icon-toasted"></span>
        </div>
        <div>{ this.props.toast.to }</div>
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
