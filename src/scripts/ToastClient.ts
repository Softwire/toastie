/// <reference path="main.d.ts" />

import * as Firebase from "firebase";
import * as React from "react";
import { Toast } from "./models/Toast";


export class ToastClient {
  private static FIREBASE_URL: string = "https://toastie-io.firebaseio.com/";
  private static firebase: Firebase = new Firebase(ToastClient.FIREBASE_URL);

  private currentUser: string;

  constructor(currentUser: string) {
    this.currentUser = currentUser;
  }

  private static get toastsRef() {
    return ToastClient.firebase.child("toasts");
  }

  sendToast(to: string, message: string) {
    var toast: Toast = {
      from: this.currentUser,
      to: to,
      message: message,
      timestamp: Firebase.ServerValue.TIMESTAMP
    }
    ToastClient.toastsRef.push(toast);
  }

  onToastAdded(callback: (toast: Toast) => any) {
    ToastClient.toastsRef.orderByChild("timestamp")
      .on("child_added", snapshot => {
        var toast = snapshot.val();
        callback(toast);
      });
  }
}
