/// <reference path="../main.d.ts" />

import * as React from "react";
import { Toast } from "../models/Toast";

interface ToastCardProps {
  toast: Toast;
}

export class ToastCard extends React.Component<ToastCardProps, {}> {
  render() {
    return <div className="toast-card">
      <div className="message">
        { this.props.toast.message }
      </div>
      <div className="timestamp">
        { new Date(this.props.toast.timestamp).toLocaleString() }
      </div>
    </div>;
  }
}
