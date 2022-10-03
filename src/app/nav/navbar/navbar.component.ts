import { AuthService } from 'src/app/auth/auth.service';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  userProfile() {
    this.router.navigate(['user-profile']);
  }

  logout() {
    this.authService.logout();
  }
}
