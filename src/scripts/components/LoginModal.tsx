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

  private get canLogin() {
    return this.state.username && this.validations.every(v => v.isValid);
  }

  private get validations() {
    return [
      {
        isValid: this.state.username.length <= LoginModal.MAX_USERNAME_LENGTH,
        message: `Username cannot be more than ${LoginModal.MAX_USERNAME_LENGTH} characters.`
      },
      {
        isValid: !/(?:^ |  | $)/.test(this.state.username),
        message: "Username cannot start or end with a space and cannot have consecutive spaces."
      },
      {
        isValid: !/[,;\t\r\n\f]/.test(this.state.username),
        message: "Username cannot contain commas, semicolons, tabs or newlines."
      }
    ]
  }

  private handleSubmit(e: React.FormEvent) {
    if (this.canLogin) {
      this.props.onLogin(this.state.username);
    }
    e.preventDefault();
    return false;
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
        <form action="login" onSubmit={ e => this.handleSubmit(e) }>
          <input type="text" className="toast-input" placeholder="Username" autoFocus
            autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"
            value={ this.state.username } onChange={ e => this.handleUsernameChange(e) } />
          <div id="validation">
            { this.validations.filter(v => !v.isValid).map(v => <div>{ v.message }</div>) }
          </div>
          <div id="login">
            <button className="toast-btn" type="submit" disabled={ !this.canLogin }>
              <span className="icon-toast"></span> Login
            </button>
          </div>
        </form>
      </div>
    </div>;
  }
}
