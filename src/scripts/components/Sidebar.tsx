/// <reference path="../main.d.ts" />

import * as React from "react";
import { Logo } from "./Logo";
import { UserPanel } from "./UserPanel";
import { ToastForm } from "./ToastForm";
import { ToastClient } from "../ToastClient";

interface SidebarProps {
  toastClient: ToastClient;
  username: string;
  onLogout: () => void;
}

export class Sidebar extends React.Component<SidebarProps, {}> {
  render() {
    var loggedIn = this.props.username !== null;
    return <div id="sidebar">
      <Logo />
      { loggedIn && <UserPanel username={ this.props.username } onLogout={ this.props.onLogout } /> }
      <hr />
      <ToastForm toastClient={ this.props.toastClient } loggedIn={ loggedIn } />
      <hr />
    </div>;
  }
}
