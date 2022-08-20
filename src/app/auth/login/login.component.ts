import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  disabledNavbar: boolean = true;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
    })
  }

  onSubmit() {
    //console.log(this.loginForm.value);
    //this.router.navigate(['/home']);
    this.authService.login(this.loginForm.value);
  }

}
