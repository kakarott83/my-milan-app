import { Component, OnInit } from '@angular/core';
import { FormBuilder, NumberValueAccessor, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Country } from '../../model/country';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  myCustomer = {
    id: 0,
    name: '',
    city: '',
    country: '',
  };

  myCustomerForm = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    city: ['', Validators.required],
    country: ['', Validators.required],
  });

  countryList: Country[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.dataService.getCountries().subscribe((result) => {
      this.countryList = result;
    });

    if (this.router.url != 'createCustomer') {
      var id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      this.dataService.getCustomerById(id).subscribe((result) => {
        this.myCustomer = result;

        this.myCustomerForm.setValue({
          id: String(this.myCustomer.id),
          name: this.myCustomer.name,
          city: this.myCustomer.city,
          country: this.myCustomer.country,
        });
      });
    }
  }

  submit() {
    this.myCustomer.name = this.myCustomerForm.get('name')?.value as string;
    this.myCustomer.city = this.myCustomerForm.get('city')?.value as string;
    this.myCustomer.country = this.myCustomerForm.get('country')
      ?.value as string;

    this.dataService.createOrUpdateCustomer(this.myCustomer).subscribe();
    this.router.navigate(['customer-list']);
  }

  changeCountry(e: any) {
    var cname = this.myCustomerForm.get('country')?.value;
    var selectCountry = this.countryList.find((e) => e.name === cname);
    console.log(selectCountry);
  }
}
