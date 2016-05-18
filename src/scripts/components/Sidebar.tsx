/// <reference path="../main.d.ts" />

import * as React from "react";
import { Logo } from "./Logo"
import { ToastForm } from "./ToastForm"

export class Sidebar extends React.Component<{}, {}> {
  render() {
    return <div id="sidebar">
      <Logo />
      <ToastForm />
    </div>;
  }
}
