import { InMemoryDbService } from 'angular-in-memory-web-api';
import { debounceTime, filter, map, Observable } from 'rxjs';
import { find, single, switchMap, take } from 'rxjs/operators';

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

  myCountryList: Country[] = [];

  getTravelById(id: number): Observable<Travel> {
    var resp = this.httpClient.get<Travel>(this.baseUrl + '/travels/' + id);
    return resp;
  }

  getTravelsByUser(): Observable<Travel[]> {
    var resp = this.httpClient.get<Travel[]>(this.baseUrl + '/travels/');
    return resp;
  }

  createOrUpdateTravel(travel: Travel): Observable<Travel> {
    return this.httpClient.post<Travel>(this.baseUrl + '/travels/', travel);
  }

  deleteTravel(id: number): Observable<Travel> {
    return this.httpClient.delete<Travel>(this.baseUrl + '/travels/' + id);
  }

  getCountryById(id: number): Observable<Country> {
    return this.httpClient.get<Country>(this.baseUrl + '/countries/' + id);
  }

  getCountryByName(name?: string): Observable<Country[]> {
    console.log(name, 'NameService');
    return this.httpClient.get<Country[]>(this.baseUrl + '/countries/').pipe(
      map((x) =>
        x.filter((c) => {
          return c.name === name;
        })
      )
    );
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

  /*ToDo*/
  getCustomerByName(name: string): Observable<Customer> {
    console.log(name, 'GetCustomerByName');
    return this.getCustomers().pipe(
      map((c) => c.find((x) => x.name === name) as Customer)
    );
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
