import { Subscription } from 'rxjs';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../auth/auth.service';
import { AuthUser } from '../model/authUser';
import { User } from '../model/user';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  myUserProfile!: FormGroup;
  myUserId = '';
  currentUser: User = {};
  private myUser: Subscription = Subscription.EMPTY;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private dataService: DataService
  ) {
    this.createOrUpdateForm();
    this.getCurrentAuthUserData();
  }

  ngOnInit(): void {}

  createOrUpdateForm(user?: User) {
    if (user) {
      this.myUserProfile = this.fb.group({
        name: [
          { value: user.displayName, disabled: false },
          Validators.required,
        ],
        eMail: [{ value: user.email, disabled: true }],
        since: [{ value: user.createdAt, disabled: true }],
        lastLogin: [{ value: user.lastLoginAt, disabled: true }],
        //role: [user.role],
        role: [{ value: 'Admin', disabled: false }],
      });
    } else {
      this.myUserProfile = this.fb.group({
        name: [''],
        eMail: [''],
        since: [''],
        lastLogin: [''],
        role: [''],
      });
    }
  }

  getCurrentAuthUserData() {
    this.authService.currentAuthStatus.subscribe((authData) => {
      this.myUserId = authData.uid;
      if (this.myUserId) {
        this.dataService.getUserById(this.myUserId).subscribe((data) => {
          this.currentUser = data[0];
          this.currentUser.createdAt = authData.metadata.creationTime;
          this.currentUser.lastLoginAt = authData.metadata.lastSignInTime;
          this.createOrUpdateForm(this.currentUser);
        });
      } else {
        console.log('keine Daten', 'myUserId');
      }
    });
  }

  updateUpdateUser() {
    const name = this.myUserProfile.get('name')?.value;
    const role = this.myUserProfile.get('role')?.value;
    /*Display Update wenn es Änderungen gab*/
    if (this.currentUser.displayName !== name && name !== '') {
      this.authService.updateDisplayName(name);
    }

    const data = { uid: this.currentUser.uid, role: role };

    this.dataService.createOrUpdateAppUserData(data);

    /*UserDaten speichern*/

    /*
    this.dataService
      .updateUser(this.currentUser)
      .then((user) => {
        console.log('User aktualisiert');
      })
      .catch((error) => {
        console.log(error, 'User nicht aktualisiert');
      });*/
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.myUser.unsubscribe();
    console.log('OnDestroy');
  }
}
