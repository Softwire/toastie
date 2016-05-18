/// <reference path="main.d.ts" />

import * as Firebase from "firebase";

export class ToastClient {
  private static firebase: Firebase = new Firebase("https://toasty.firebaseio.com/");

  static sendToast(message: string) {
    ToastClient.firebase.child("toasts").push({
      message: message,
      time: Firebase.ServerValue.TIMESTAMP
    });
  }
}
