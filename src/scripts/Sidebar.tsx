/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import { ToastLogo } from "./ToastLogo"

export class Sidebar extends React.Component<{}, {}> {
  render() {
    return <div id="sidebar">
      <ToastLogo />
    </div>;
  }
}
