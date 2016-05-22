/// <reference path="../main.d.ts" />

import * as React from "react";
import { LoginModal } from "./LoginModal";
import { Sidebar } from "./Sidebar";
import { ToastList } from "./ToastList";
import { ToastClient } from "../ToastClient";

interface ToastAppState {
  username: string;
}

export class ToastApp extends React.Component<{}, ToastAppState> {
  private static USERNAME_KEY = "toast.username";
  private toastList: ToastList;

  constructor() {
    super();
    var username = localStorage.getItem(ToastApp.USERNAME_KEY);
    this.state = { username: username };
  }

  private handleLogin(username: string) {
    this.setState(s => {
      s.username = username;
      return s;
    });
    localStorage.setItem(ToastApp.USERNAME_KEY, username);
  }

  private handleLogout() {
    // BUG: Logout does not work.
    return;
    // this.setState(s => {
    //   s.username = null;
    //   return s;
    // });
    // localStorage.removeItem(ToastApp.USERNAME_KEY);
  }

  componentDidMount() {
    window.addEventListener("wheel", e => {
      this.toastList.scroll(e.deltaY);
      e.preventDefault();
    });
  }

  render() {
    var toastClient = new ToastClient(this.state.username);
    return <div id="toast-app">
      { this.state.username == null && <LoginModal onLogin={ u => this.handleLogin(u) } /> }
      <ToastList ref={ ref => this.toastList = ref } toastClient={ toastClient } username={ this.state.username } />
      <Sidebar toastClient={ toastClient } username={ this.state.username } onLogout={ () => this.handleLogout() } />
    </div>;
  }
}
