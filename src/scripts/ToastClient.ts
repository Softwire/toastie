/// <reference path="main.d.ts" />

import * as Firebase from "firebase";
import { Toast } from "./models/Toast";

export class ToastClient {
  private static FIREBASE_URL: string = "https://toastie-io.firebaseio.com/";
  private static firebase: Firebase = new Firebase(ToastClient.FIREBASE_URL);

  private static get toastsRef() { return ToastClient.firebase.child("toasts"); }

  static sendToast(message: string) {
    var toast: Toast = {
      message: message,
      timestamp: Firebase.ServerValue.TIMESTAMP
    }
    ToastClient.toastsRef.push(toast);
  }

  static onToastAdded(callback: (toast: Toast) => any) {
    ToastClient.toastsRef.orderByChild("timestamp")
      .on("child_added", snapshot => {
        var toast = snapshot.val();
        callback(toast);
      });
  }
}
