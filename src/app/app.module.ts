import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { HighchartsChartModule } from 'highcharts-angular';
import { NgChartsModule } from 'ng2-charts';

import { DatePipe, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';
import { ErrorComponent } from './auth/error/error.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { RegisterComponent } from './auth/register/register.component';
import { VerifyEmailAddressComponent } from './auth/verify-email-address/verify-email-address.component';
import { DashboardColumnComponent } from './charts/dashboard-column/dashboard-column.component';
import { DashboardLineComponent } from './charts/dashboard-line/dashboard-line.component';
import { DashboardPieComponent } from './charts/dashboard-pie/dashboard-pie.component';
import { LineComponent } from './charts/line/line.component';
import { CountryListComponent } from './logic/country-list/country-list.component';
import { CountryComponent } from './logic/country/country.component';
import { CreateOrUpdateTravelComponent } from './logic/create-or-update-travel/create-or-update-travel.component';
import { CustomerListComponent } from './logic/customer-list/customer-list.component';
import { CustomerComponent } from './logic/customer/customer.component';
import { HomeComponent } from './logic/home/home.component';
import { TravelListComponent } from './logic/travel-list/travel-list.component';
import { NavbarComponent } from './nav/navbar/navbar.component';
import { InMemoryDataService } from './services/in-memory-data.service';
import { TestTabComponent } from './test/test-tab/test-tab.component';
import { TestUserComponent } from './test/test-user/test-user.component';
import { TestComponent } from './test/test.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

registerLocaleData(localeDe, 'de-DE', localeDeExtra);
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
    CustomerComponent,
    DashboardColumnComponent,
    DashboardPieComponent,
    DashboardLineComponent,
    LineComponent,
    ForgotPasswordComponent,
    VerifyEmailAddressComponent,
    ErrorComponent,
    TestComponent,
    TestTabComponent,
    TestUserComponent,
    UserProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    HighchartsChartModule,
    NgChartsModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    MatTabsModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'de-DE',
    },
    DatePipe,
    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
