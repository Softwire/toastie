/// <reference path="../main.d.ts" />

import * as React from "react";
import { ToastClient } from "../ToastClient";
import { Toast } from "../models/Toast";
import { ToastCard } from "./ToastCard";

interface ToastListProps {
  toastClient: ToastClient;
  username: string;
}

interface ToastListState {
  toasts: Toast[];
}

export class ToastList extends React.Component<ToastListProps, ToastListState> {
  private list: HTMLDivElement;

  constructor() {
    super();
    this.state = {
      toasts: []
    };
  }

  private get toastCards() {
    return this.state.toasts.map((toast, index) => {
      return <div key={ index }>
        <ToastCard toast={ toast } toastClient={ this.props.toastClient } username={ this.props.username } />
      </div>
    });
  }

  scroll(delta: number) {
    this.list.scrollLeft += delta;
  }

  componentDidMount() {
    this.props.toastClient.onToastAdded(toast => {
      this.setState(s => {
        s.toasts.unshift(toast);
        return s;
      });
    });
  }

  render() {
    return <div id="toast-list" ref={ ref => this.list = ref }>
      { this.toastCards }
    </div>;
  }
}
