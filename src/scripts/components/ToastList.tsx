/// <reference path="../main.d.ts" />

import * as React from "react";
import { ToastClient } from "../ToastClient";
import { Toast } from "../models/Toast";
import { ToastCard } from "./ToastCard";

interface ToastListProps {
  toastClient: ToastClient;
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
    return this.state.toasts.map((t, i) => <ToastCard key={ i } toast={ t } />);
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
      <div>
        { this.toastCards }
      </div>
    </div>;
  }
}
