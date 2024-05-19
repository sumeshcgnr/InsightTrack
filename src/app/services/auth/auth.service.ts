import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';

import { userData } from './userinteface'

import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: userData = { displayName: '', email: '', photoURL: '', verified: false };
  private stateChange = new Subject<any>();

  constructor(public fAuth: AngularFireAuth) {
  }

  ngOnInit(): void {
  }

  GetLoggedInUser(): userData {
    return this.user;
  }

  doGoogleSignIn(): void {
    //this.registerAuthStateChange();
    this.fAuth.signInWithPopup(new GoogleAuthProvider());
  }

  broadcastAuthStateChange(data: any) {
    this.stateChange.next(data);
  }

  subscribeFirebaseAuthStateChange(): Observable<any> {
    return this.stateChange.asObservable();
  }


  /*
  registerAuthStateChange() {
    console.log("registerAuthStateChange");
    var subscribe = this.fAuth.onAuthStateChanged((user) => {
      console.log("onAuthStateChanged : ", user);
      if (user) {
        if (user.displayName != null && user.email != null && user.photoURL != null) {
          this.user = {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            verified: user.emailVerified
          };     
          
        }
      }
    });    
  }*/

  doFirebaseAuth() {
    console.log("doFirebaseAuth");
    //this.registerAuthStateChange();
    var promise = new Promise((resolve, reject) => {
      this.fAuth.signInWithPopup(new GoogleAuthProvider())
        .then(res => {
          if (res != null && res.user != null && res.user.email != null) {
            console.log(res.user.displayName, res.user.email);
            let displayName: string | null = ((res.user.displayName == null || res.user.displayName == '') ? res.user.email?.split('@')[0] : res.user.displayName) as string;
            this.user = {
              displayName: displayName,
              email: res.user.email,
              photoURL: res.user.photoURL,
              verified: res.user.emailVerified
            };
            this.broadcastAuthStateChange(this.user);
          }          
          resolve(res)
        }).catch((err) => reject(err));
    });
    return promise;
  }

  doFirebaseLogout() {
    console.log("logout");
    var promise = new Promise((resolve, reject) => {
      this.fAuth.signOut().then((res) => {
        console.log("firebase logout success");
        resolve(res)
      }).catch((err) => {
        console.log("firebase logout failed :", err);
        reject(err);
      })
    });
    return promise;
  }
}
