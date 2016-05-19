/// <reference path="../main.d.ts" />

import * as React from "react";
import { Sidebar } from "./Sidebar"
import { ToastList } from "./ToastList"

export class ToastApp extends React.Component<{}, {}> {
  private toastList: ToastList;

  componentDidMount() {
    window.addEventListener("wheel", e => {
      this.toastList.scroll(e.deltaY);
      e.preventDefault();
    });
  }

  render() {
    return <div id="toasty-app">
      <ToastList ref={ ref => this.toastList = ref } /><Sidebar />
    </div>;
  }
}
