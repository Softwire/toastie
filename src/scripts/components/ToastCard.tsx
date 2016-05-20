/// <reference path="../main.d.ts" />

import * as React from "react";
import { Toast } from "../models/Toast";

interface ToastCardProps {
  toast: Toast;
}

export class ToastCard extends React.Component<ToastCardProps, {}> {
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
          <span className="icon-toast"></span>
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
