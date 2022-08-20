import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Country } from '../../model/country';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  myCountry: Country = {
    id: 0,
    name: '',
    rate: 0,
    halfRate: 0,
  };

  myCountryForm = this.fb.group({
    id: [''],
    name: [''],
    rate: [0],
    halfRate: [0],
  });

  ngOnInit(): void {
    if (this.router.url != '/createCountry') {
      var id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      this.dataService.getCountryById(id).subscribe((result) => {
        this.myCountry = result;

        this.myCountryForm.setValue({
          id: String(this.myCountry.id),
          name: this.myCountry.name,
          rate: this.myCountry.rate,
          halfRate: this.myCountry.halfRate,
        });
      });
    }
  }

  submit() {
    this.myCountry.name = this.myCountryForm.get('name')?.value as string;
    this.myCountry.rate = this.myCountryForm.get('rate')?.value as number;
    this.myCountry.halfRate = this.myCountryForm.get('halfRate')
      ?.value as number;

    this.dataService.createOrUpdateCountry(this.myCountry).subscribe();
    this.router.navigate(['country-list']);
  }
}
