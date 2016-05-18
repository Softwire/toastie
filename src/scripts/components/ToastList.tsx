/// <reference path="../main.d.ts" />

import * as React from "react";
import { ToastClient } from "../ToastClient";
import { Toast } from "../models/Toast";
import { ToastCard } from "./ToastCard";

interface ToastListState {
  toasts: Toast[];
}

export class ToastList extends React.Component<{}, ToastListState> {
  constructor() {
    super();
    this.state = {
      toasts: []
    }
  }

  componentDidMount() {
    ToastClient.onToastAdded(toast => {
      this.setState(s => {
        s.toasts.unshift(toast);
        return s;
      });
    });
  }

  toastCards() {
    return this.state.toasts.map((t, i) => <ToastCard key={ i } toast={ t } />);
  }

  render() {
    return <div id="toast-list">
      <div>
        { this.toastCards() }
      </div>
    </div>;
  }
}
