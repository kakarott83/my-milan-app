import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  disabledNavbar: boolean = true;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      displayName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
    });
  }

  onSubmit() {
    const email = this.registerForm.get('email')?.value;
    const pw = this.registerForm.get('password')?.value;

    this.authService.registerWithEmailPassword(email, pw);
  }

  registerWithGoogle() {}
}
