/// <reference path="main.d.ts" />

import * as React from "react";
import { Toast } from "./models/Toast";
import * as firebase from "firebase";

(() => {
  firebase.initializeApp({
      apiKey: "AIzaSyCom1lOY5MBZpdclMK6IINSk_1Brg1aB0s",
      authDomain: "toastie-io.firebaseapp.com",
      databaseURL: "https://toastie-io.firebaseio.com",
      storageBucket: "toastie-io.appspot.com",
  });
  firebase.auth().signInAnonymously();
})();

export class ToastClient {
  private currentUser: string;

  constructor(currentUser: string) {
    this.currentUser = currentUser;
  }

  private get toastsRef(): any {
    return firebase.database().ref("toasts");
  }

  sendToast(to: string, message: string) {
    var toast: Toast = {
      from: this.currentUser,
      to: to,
      message: message,
      timestamp: firebase.database.ServerValue.TIMESTAMP
    };
    this.toastsRef.push(toast);
  }

  onToastAdded(callback: (toast: Toast) => any) {
    this.toastsRef.orderByChild("timestamp")
      .on("child_added", (snapshot: any) => {
        var toast = snapshot.val();
        callback(toast);
      });
  }
}
