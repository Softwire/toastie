/// <reference path="../main.d.ts" />

import * as React from "react";
import { LoginModal } from "./LoginModal";
import { Sidebar } from "./Sidebar";
import { ToastList } from "./ToastList";

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

  componentDidMount() {
    window.addEventListener("wheel", e => {
      this.toastList.scroll(e.deltaY);
      e.preventDefault();
    });
  }

  render() {
    return <div id="toast-app">
      { this.state.username == null && <LoginModal onLogin={ u => this.handleLogin(u) } /> }
      <ToastList ref={ ref => this.toastList = ref } /><Sidebar />
    </div>;
  }
}
