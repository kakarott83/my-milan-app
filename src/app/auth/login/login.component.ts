import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  error = '';

  disabledNavbar: boolean = true;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    const email = this.loginForm.get('email')?.value;
    const pw = this.loginForm.get('password')?.value;
    this.authService.login(email, pw).then((result) => {
      if (result !== undefined) {
        this.error = 'E-Mail oder Passwort nicht korrekt';
      }
    });
  }

  loginWithGoogle() {}
}
