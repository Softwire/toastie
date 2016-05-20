/// <reference path="../main.d.ts" />

import * as React from "react";
import { Logo } from "./Logo";
import { UserPanel } from "./UserPanel";
import { ToastForm } from "./ToastForm";

interface SidebarProps {
  username: string;
}

export class Sidebar extends React.Component<SidebarProps, {}> {
  render() {
    return <div id="sidebar">
      <Logo/>
      <UserPanel username={ this.props.username }/>
      <hr/>
      <ToastForm/>
      <hr/>
    </div>;
  }
}
