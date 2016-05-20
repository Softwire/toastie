/// <reference path="../main.d.ts" />

import * as React from "react";
import { Logo } from "./Logo";
import { UserPanel } from "./UserPanel";
import { ToastForm } from "./ToastForm";

interface SidebarProps {
  username: string;
  onLogout: () => void;
}

export class Sidebar extends React.Component<SidebarProps, {}> {
  render() {
    return <div id="sidebar">
      <Logo/>
      { this.props.username && <UserPanel username={ this.props.username } onLogout={ this.props.onLogout }/> }
      <hr/>
      <ToastForm/>
      <hr/>
    </div>;
  }
}
