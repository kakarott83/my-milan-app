import * as auth from 'firebase/auth';
import { collection, doc, getFirestore, setDoc } from 'firebase/firestore';
import { AuthService } from 'src/app/auth/auth.service';

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

  displayName: string = '';
  uid: string = '';
  isAuthentificated: any;

  constructor(
    private authService: AuthService,
    private dataService: DataService
  ) {
    this.getCurrentUserData();
  }

  ngOnInit(): void {}

  updateDisplayName() {
    this.authService.updateDisplayName(this.displayName);
  }

  getCurrentUserData() {
    this.authService.currentAuthStatus.subscribe((authStatus) => {
      this.isAuthentificated = authStatus;
      this.currentUser = authStatus;
      this.displayName = this.currentUser.displayName;
      this.uid = this.currentUser.uid;
      console.log(this.currentUser.uid, 'Test');
    });
  }

  getUser() {
    this.dataService.getUserById(this.uid).subscribe((data) => {
      console.log(data, 'UserService');
    });
  }
}
