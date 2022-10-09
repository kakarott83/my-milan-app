import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { ErrorComponent } from './auth/error/error.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { RegisterComponent } from './auth/register/register.component';
import { VerifyEmailAddressComponent } from './auth/verify-email-address/verify-email-address.component';
import { CountryListComponent } from './logic/country-list/country-list.component';
import { CountryComponent } from './logic/country/country.component';
import { CreateOrUpdateTravelComponent } from './logic/create-or-update-travel/create-or-update-travel.component';
import { CustomerListComponent } from './logic/customer-list/customer-list.component';
import { CustomerComponent } from './logic/customer/customer.component';
import { HomeComponent } from './logic/home/home.component';
import { TravelListComponent } from './logic/travel-list/travel-list.component';
import { TestTabComponent } from './test/test-tab/test-tab.component';
import { TestComponent } from './test/test.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    //canActivate: [AuthGuard],
  },
  {
    path: 'createTravel',
    component: CreateOrUpdateTravelComponent,
    //,canActivate: [AuthGuard]
  },
  {
    path: 'createCustomer',
    component: CustomerComponent,
    //,canActivate: [AuthGuard]
  },
  {
    path: 'editTravel/:id',
    component: CreateOrUpdateTravelComponent,
    //,canActivate: [AuthGuard]
  },
  {
    path: 'editCountry/:id',
    component: CountryComponent,
  },
  {
    path: 'editCustomer/:id',
    component: CustomerComponent,
  },
  {
    path: 'country-list',
    component: CountryListComponent,
    //,canActivate: [AuthGuard]
  },
  {
    path: 'travel-list',
    component: TravelListComponent,
    //,canActivate: [AuthGuard]
  },
  {
    path: 'customer-list',
    component: CustomerListComponent,
    //,canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'verify-email-address',
    component: VerifyEmailAddressComponent,
  },
  {
    path: 'test',
    component: TestTabComponent,
  },
  {
    path: 'user-profile',
    component: UserProfileComponent,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: ErrorComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
