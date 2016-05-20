/// <reference path="../main.d.ts" />

import * as React from "react";

interface UserPanelProps {
  username: string;
  onLogout: () => void;
}

export class UserPanel extends React.Component<UserPanelProps, {}> {
  render() {
    return <div id="user-panel">
      <div className="user-picture">
        <span className="fa fa-lg fa-user"></span>
      </div>
      <div className="username">
        { this.props.username }
      </div>
      <div className="logout">
        <button className="toast-btn" onClick={ () => this.props.onLogout() }>
          <span className="fa fa-lg fa-sign-out"></span>
        </button>
      </div>
    </div>;
  }
}
