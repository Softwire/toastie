/// <reference path="main.d.ts" />

import * as Promise from "es6-promise";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { ToastApp } from "./components/ToastApp";

ReactDOM.render(<ToastApp />, document.getElementById("content"));
