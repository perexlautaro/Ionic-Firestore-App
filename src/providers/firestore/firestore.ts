import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

const Firestore = (<any>window).Firestore;
const OPTIONS = {
  "datePrefix": '__DATE:',
  "fieldValueDelete": "__DELETE",
  "fieldValueServerTimestamp" : "__SERVERTIMESTAMP",
  "persist": true
};

/*
  Generated class for the FirestoreProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirestoreProvider {

  constructor(public http: HttpClient, private platform:Platform) {
    this.platform.ready().then(() => {
      console.log('Hello FirestoreProvider Provider');
      this.showName();
    });
  }

  private async showName(){
    let name:string = await this.getName();
    alert('The name in Firestore is: ' + name);
  }

  private getName():Promise<string>{
    return Firestore.initialise(OPTIONS).then(function(db) {
      var collection = db.collection("users");
      return collection.get("uibBjSLJKACseNXu0p6I").then((res) => {
        return JSON.stringify(res);
      }) .catch((err2) => {
        console.log(err2);
        return "err2";
      });
    }).catch((err) => {
      console.log(err);
      return "err";
    });
  }
}
