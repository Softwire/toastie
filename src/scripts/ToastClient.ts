/// <reference path="main.d.ts" />

import * as Firebase from "firebase";
import { Toast } from "./models/Toast";

export class ToastClient {
  private static firebaseToasts: Firebase = new Firebase("https://toasty.firebaseio.com/").child("toasts");

  static sendToast(message: string) {
    var toast: Toast = {
      message: message,
      timestamp: Firebase.ServerValue.TIMESTAMP
    }
    ToastClient.firebaseToasts.push(toast);
  }

  static onToastAdded(callback: (toast: Toast) => any) {
    ToastClient.firebaseToasts.orderByChild("timestamp")
      .on("child_added", snapshot => {
        var toast = snapshot.val();
        callback(toast);
      });
  }
}
