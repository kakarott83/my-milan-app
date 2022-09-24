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
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardColumnComponent } from './charts/dashboard-column/dashboard-column.component';
import { DashboardLineComponent } from './charts/dashboard-line/dashboard-line.component';
import { DashboardPieComponent } from './charts/dashboard-pie/dashboard-pie.component';
import { CountryListComponent } from './logic/country-list/country-list.component';
import { CountryComponent } from './logic/country/country.component';
import { CreateOrUpdateTravelComponent } from './logic/create-or-update-travel/create-or-update-travel.component';
import { CustomerListComponent } from './logic/customer-list/customer-list.component';
import { CustomerComponent } from './logic/customer/customer.component';
import { HomeComponent } from './logic/home/home.component';
import { TravelListComponent } from './logic/travel-list/travel-list.component';
import { NavbarComponent } from './nav/navbar/navbar.component';
import { InMemoryDataService } from './services/in-memory-data.service';
import { LineComponent } from './charts/line/line.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    HttpClientModule,
    HighchartsChartModule,
    NgChartsModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService),
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'de-DE',
    },
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
