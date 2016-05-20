/// <reference path="../main.d.ts" />

import * as React from "react";
import { Logo } from "./Logo";

interface LoginModalProps {
  onLogin: (username: string) => void;
}

interface LoginModalState {
  username: string;
}

export class LoginModal extends React.Component<LoginModalProps, LoginModalState> {
  static MAX_USERNAME_LENGTH = 30;

  constructor() {
    super();
    this.state = { username: "" };
  }

  private get usernameIsValid() {
    return this.state.username
      && !this.usernameTooLong
      && !this.usernameHasInvalidCharacters;
  }

  private get usernameHasInvalidCharacters() {
    return /[^\w]/.test(this.state.username);
  }

  private get usernameTooLong() {
    return this.state.username.length > 30;
  }

  private handleSubmit(e: React.FormEvent) {
    this.props.onLogin(this.state.username);
    e.preventDefault();
  }

  private handleUsernameChange(e: React.FormEvent) {
    var input = e.target as HTMLInputElement;
    this.setState(s => {
      s.username = input.value;
      return s;
    });
    e.preventDefault();
  }

  render() {
    return <div id="login-modal">
      <div id="login-form">
        <Logo />
        <form onSubmit={ e => this.handleSubmit(e) }>
          <input type="text" className="toast-input" placeholder="Username" autoFocus
            value={ this.state.username } onChange={ e => this.handleUsernameChange(e) } />
          <div id="validation">
            <span hidden={ !this.usernameTooLong }>Username cannot be more than { LoginModal.MAX_USERNAME_LENGTH } characters.</span>
            <span hidden={ !this.usernameHasInvalidCharacters }>Username can only contain letters, numbers and underscores.</span>
          </div>
          <div id="login">
            <button className="toast-btn" type="submit" disabled={ !this.usernameIsValid }>
              <span className="icon-toast"></span> Login
            </button>
          </div>
        </form>
      </div>
    </div>;
  }
}
