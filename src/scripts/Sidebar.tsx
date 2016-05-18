/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import { Logo } from "./Logo"

export class Sidebar extends React.Component<{}, {}> {
  render() {
    return <div id="sidebar">
      <Logo />
    </div>;
  }
}
