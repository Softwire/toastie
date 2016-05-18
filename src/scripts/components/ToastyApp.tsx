/// <reference path="../main.d.ts" />

import * as React from "react";
import { Sidebar } from "./Sidebar"
import { ToastList } from "./ToastList"

export class ToastyApp extends React.Component<{}, {}> {
  render() {
    return <div id="toasty-app">
      <ToastList /><Sidebar />
    </div>;
  }
}
