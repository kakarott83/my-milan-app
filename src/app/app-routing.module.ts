import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { RegisterComponent } from './auth/register/register.component';
import { CountryListComponent } from './logic/country-list/country-list.component';
import { CountryComponent } from './logic/country/country.component';
import { CreateOrUpdateTravelComponent } from './logic/create-or-update-travel/create-or-update-travel.component';
import { CustomerListComponent } from './logic/customer-list/customer-list.component';
import { CustomerComponent } from './logic/customer/customer.component';
import { HomeComponent } from './logic/home/home.component';
import { TravelListComponent } from './logic/travel-list/travel-list.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    //,canActivate: [AuthGuard]
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
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  /*{ path: 'home',
    component: HomeComponent,
    children: [
      { path: 'travel-list',
        component: TravelListComponent
      },
      { path: 'travel-list',
        component: TravelListComponent
      },
      { path: 'createTravel',
        component: CreateOrUpdateTravelComponent
      },
      { path: 'edit/:id',
        component: CreateOrUpdateTravelComponent
      }
    ]
  },*/

  /*{ path: 'login', component: LoginComponent },

  { path: 'travel-list', component: TravelListComponent},
  { path: 'createTravel', component: CreateOrUpdateTravelComponent },
  { path: 'edit/:id', component: CreateOrUpdateTravelComponent },*/
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
