//import * as auth from 'firebase/auth';
import { getAuth, GoogleAuthProvider, updateProfile } from 'firebase/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
	AngularFirestore,
	AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

import { AuthUser } from '../model/authUser';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  currentUser: any = {};
  private authStatusSub = new BehaviorSubject(this.currentUser);
  currentAuthStatus = this.authStatusSub.asObservable();
  private loggedInUser: Observable<any> | null = null;
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private veryfied: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  /* https://www.positronx.io/full-angular-firebase-authentication-system/ */

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public ngZone: NgZone,
    private router: Router
  ) {
    /*     this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        console.log(this.userData.email, 'Auth');
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    }); */

    this.authStatusListener();
  }

  authStatusListener() {
    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        this.authStatusSub.next(user);
        this.loggedIn.next(true);
        this.veryfied.next(user.emailVerified);
        console.log(user, 'User ist da');
      } else {
        this.authStatusSub.next(null);
        this.loggedIn.next(false);
        console.log(user, 'User ist nicht da');
      }
    });
  }

  login(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.setUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['home']);
          }
        });
      })
      .catch((error) => {
        return error.message;
        //window.alert(error.message);
      });
  }

  registerWithEmailPassword(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.sendVerificationMail();
        this.setUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  ForgotPasswort(passwortResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwortResetEmail)
      .then(() => {
        window.alert(
          'E-Mail zum rücksetzen des Passwort wurde verschickt, überprüfe dein E-Mail Postfach.'
        );
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  get isLoggedIn(): boolean {
    return this.loggedIn.value;
  }

  get isVeryfied(): boolean {
    return this.veryfied.value;
  }

  GoogleAuth() {
    const provider = new GoogleAuthProvider();
    return this.AuthLogin(provider).then((res: any) => {
      this.router.navigate(['home']);
    });
  }

  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['home']);
        this.setUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  sendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }

  setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.id}`
    );
    const userData: AuthUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  updateDisplayName(name: string) {
    const auth = getAuth();
    if (name !== undefined && auth.currentUser) {
      updateProfile(auth.currentUser, {
        displayName: name,
      })
        .then(() => {
          console.log(auth.currentUser, 'User wurde aktualisiert');
        })
        .catch((error) => {
          console.log('User konnte nicht aktualisiert werden');
        });
    }
  }

  logout() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }
}
