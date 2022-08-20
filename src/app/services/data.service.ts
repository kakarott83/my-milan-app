import { InMemoryDbService } from 'angular-in-memory-web-api';
import { debounceTime, Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Country } from '../model/country';
import { Customer } from '../model/customer';
import { Travel } from '../model/travel';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private httpClient: HttpClient) {}

  baseUrl: string = '/api';

  getTravelById(id: number): Observable<Travel> {
    var resp = this.httpClient.get<Travel>(this.baseUrl + '/travels/' + id);
    return resp;
  }

  getTravelsByUser(): Observable<Travel[]> {
    var resp = this.httpClient.get<Travel[]>(this.baseUrl + '/travels/');
    return resp;
  }

  createOrUpdateTravel(travel: Travel): Observable<Travel> {
    var resp = this.httpClient.post<Travel>(this.baseUrl + '/travels/', travel);
    return resp;
  }

  deleteTravel(id: number): Observable<Travel> {
    var resp = this.httpClient.delete<Travel>(this.baseUrl + '/travels/' + id);
    return resp;
  }

  getCountryById(id: number): Observable<Country> {
    return this.httpClient.get<Country>(this.baseUrl + '/countries/' + id);
  }

  getCountries(): Observable<Country[]> {
    return this.httpClient.get<Country[]>(this.baseUrl + '/countries/');
  }

  createOrUpdateCountry(country: Country): Observable<Country> {
    return this.httpClient.post<Country>(this.baseUrl + '/countries/', country);
  }

  deleteCountry(id: number): Observable<Country> {
    return this.httpClient.delete<Country>(this.baseUrl + '/countries/' + id);
  }

  getCustomers(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(this.baseUrl + '/customers/');
  }

  getCustomerById(id: number): Observable<Customer> {
    return this.httpClient.get<Customer>(this.baseUrl + '/customers/' + id);
  }

  createOrUpdateCustomer(customer: Customer): Observable<Customer> {
    return this.httpClient.post<Customer>(
      this.baseUrl + '/customers/',
      customer
    );
  }

  deleteCustomer(id: number): Observable<Customer> {
    return this.httpClient.delete<Customer>(this.baseUrl + '/customers/' + id);
  }
}
