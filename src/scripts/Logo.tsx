/// <reference path="../../typings/index.d.ts" />

import * as React from "react";

export class Logo extends React.Component<{}, {}> {
  render() {
    return <div id="logo">
      <img src="content/logo.png" alt="Toast"/>
    </div>;
  }
}
