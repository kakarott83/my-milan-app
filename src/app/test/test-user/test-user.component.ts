import * as auth from 'firebase/auth';
import { collection, doc, getFirestore, setDoc } from 'firebase/firestore';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/model/user';

import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { AuthUser } from '../../model/authUser';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-test-user',
  templateUrl: './test-user.component.html',
  styleUrls: ['./test-user.component.scss'],
})
export class TestUserComponent implements OnInit {
  currentUser: AuthUser = {
    uid: '',
    email: '',
    displayName: '',
    photoURL: '',
    emailVerified: false,
  };

  appUser: User = {};

  displayName: string = '';
  uid: string = '';
  isAuthentificated: any;

  constructor(
    private authService: AuthService,
    private dataService: DataService
  ) {
    authService.currentAuthStatus.subscribe((user) => {
      if (user) {
        this.appUser = {
          uid: user.uid,
          email: user.email,
          displayName: this.displayName,
          emailVerfied: user.emailVerified,
          role: 'Admin',
          //createdAt: user.metadata.createdAt,
          //creationTime: user.metadat.creationTime,
          //lastLoginAt: user.metadat.lastLoginAt,
          //lastSignInTime: user.metadat.lastSignInTime,
        };
      }
    });
  }

  ngOnInit(): void {}

  updateDisplayName() {
    this.authService.updateDisplayName(this.displayName);
  }

  setAppUser() {
    console.log(this.appUser);
    //this.dataService.insertAppUser(user);
  }

  getUser() {
    this.dataService.getUserById(this.uid).subscribe((data) => {
      console.log(data, 'UserService');
    });
  }
}
