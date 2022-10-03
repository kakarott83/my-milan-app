import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
	UrlTree,
} from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isLoggedIn;
  }
}
