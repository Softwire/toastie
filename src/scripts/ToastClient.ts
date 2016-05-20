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
  private static HASHTAG_URL_CACHE: { [hashtag: string]: Promise<string> } = {};

  private currentUser: string;

  constructor(currentUser: string) {
    this.currentUser = currentUser;
  }

  private get hashtagsRef(): any {
    return firebase.storage().ref("hashtags");
  }

  private get toastsRef(): any {
    return firebase.database().ref("toasts");
  }

  getHashtagImageUrl(hashtag: string): Promise<string> {
    var promise = ToastClient.HASHTAG_URL_CACHE[hashtag];
    if (promise !== undefined) {
      return promise;
    }
    var fileName = hashtag.substring(1).toLowerCase();
    promise = this.hashtagsRef.child(fileName).getDownloadURL();
    ToastClient.HASHTAG_URL_CACHE[hashtag] = promise;
    return promise;
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
