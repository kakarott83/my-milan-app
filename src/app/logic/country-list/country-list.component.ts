import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, map, take } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { Country } from 'src/app/model/country';

import { Component, OnInit } from '@angular/core';

import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss'],
})
export class CountryListComponent implements OnInit {
  datesComplete: boolean = false;
  countries: Country[] = [];

  constructor(
    private authService: AuthService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.dataService
      .getCountries()
      .pipe(debounceTime(5000))
      .subscribe((countries) => {
        this.countries = countries;
        this.datesComplete = true;
      });
  }
}
