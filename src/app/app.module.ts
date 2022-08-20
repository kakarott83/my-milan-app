import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { InMemoryDataService } from './services/in-memory-data.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { RegisterComponent } from './auth/register/register.component';
import { TravelListComponent } from './logic/travel-list/travel-list.component';
import { CreateOrUpdateTravelComponent } from './logic/create-or-update-travel/create-or-update-travel.component';
import { NavbarComponent } from './nav/navbar/navbar.component';
import { HomeComponent } from './logic/home/home.component';
import { DatePipe } from '@angular/common';
import { CountryComponent } from './logic/country/country.component';
import { CountryListComponent } from './logic/country-list/country-list.component';
import { CustomerListComponent } from './logic/customer-list/customer-list.component';
import { CustomerComponent } from './logic/customer/customer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    TravelListComponent,
    CreateOrUpdateTravelComponent,
    NavbarComponent,
    HomeComponent,
    CountryComponent,
    CountryListComponent,
    CustomerListComponent,
    CustomerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
