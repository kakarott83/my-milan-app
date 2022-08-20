import { debounceTime, map, take } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Customer } from '../../model/customer';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit {
  datesComplete: boolean = false;
  customers: Customer[] = [];

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dataService
      .getCustomers()
      .pipe(debounceTime(5000))
      .subscribe((customers) => {
        this.customers = customers;
        this.datesComplete = true;
      });
  }

  createNewCustomer() {
    this.router.navigate(['/createCustomer']);
  }
}
