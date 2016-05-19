/// <reference path="main.d.ts" />

import * as Firebase from "firebase";
import { Toast } from "./models/Toast";

export class ToastClient {
  private static FIREBASE_URL: string = "https://toastie-io.firebaseio.com/";
  private static TOASTS_REF: Firebase = new Firebase(ToastClient.FIREBASE_URL).child("toasts");

  static sendToast(message: string) {
    var toast: Toast = {
      message: message,
      timestamp: Firebase.ServerValue.TIMESTAMP
    }
    ToastClient.TOASTS_REF.push(toast);
  }

  static onToastAdded(callback: (toast: Toast) => any) {
    ToastClient.TOASTS_REF.orderByChild("timestamp")
      .on("child_added", snapshot => {
        var toast = snapshot.val();
        callback(toast);
      });
  }
}
