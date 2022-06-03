import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { RegisterComponent } from './auth/register/register.component';
import { TravelListComponent } from './logic/travel-list/travel-list.component';
import { CreateOrUpdateTravelComponent } from './logic/create-or-update-travel/create-or-update-travel.component';
import { HomeComponent } from './logic/home/home.component';

const routes: Routes = [
  { path: 'home', 
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
  },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full'}
  
  
  /*{ path: 'login', component: LoginComponent },
  
  { path: 'travel-list', component: TravelListComponent},
  { path: 'createTravel', component: CreateOrUpdateTravelComponent },
  { path: 'edit/:id', component: CreateOrUpdateTravelComponent },*/
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
