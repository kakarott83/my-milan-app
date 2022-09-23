import * as moment from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, map, take } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { Country } from 'src/app/model/country';
import { Customer } from 'src/app/model/customer';
import { FilterObject } from 'src/app/model/filterObject';
import { Travel } from 'src/app/model/travel';
import { DataService } from 'src/app/services/data.service';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { CsvExportService } from '../../services/csv-export.service';

@Component({
  selector: 'app-travel-list',
  templateUrl: './travel-list.component.html',
  styleUrls: ['./travel-list.component.scss'],
})
export class TravelListComponent implements OnInit {
  isLoggedIn!: boolean;
  datesComplete: boolean = false;
  travels: Travel[] = [];
  filteredTravels: Travel[] = [];
  filterStart: any;
  filterEnd: any;
  customerList: Customer[] = [];
  countryList: Country[] = [];
  selectCustomer!: Customer;
  selectCountry!: Country;
  myFilter: FilterObject = {};
  links: any[] = ['link1.com', 'link2.com', 'link3.com'];

  mailText: string = '';

  filterForm = this.fb.group({
    filterStart: [''],
    filterEnd: [''],
    customer: [''],
    country: [''],
    isPaid: [''],
    isSubmitted: [''],
  });

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private fb: FormBuilder,
    private router: Router,
    private exportService: CsvExportService
  ) {}

  ngOnInit(): void {
    /*this.authService.isLoggedIn.subscribe(x => {
      this.isLoggedIn = x;
      console.log(this.isLoggedIn, 'LoggedIn');
    })
    */

    this.loadTravels();

    this.dataService.getTravelsByUser().subscribe((travels) => {
      this.travels = travels;
      this.filteredTravels = travels;
      this.datesComplete = true;
    });

    this.dataService.getCustomers().subscribe((customers) => {
      this.customerList = customers;
    });

    this.dataService.getCountries().subscribe((countries) => {
      this.countryList = countries;
    });
  }

  loadTravels() {
    this.dataService.getTravelsByUser().subscribe((travels) => {
      this.travels = travels;
      this.filteredTravels = travels;
      this.datesComplete = true;
    });
  }

  dateChanged(e: Event) {
    this.filterList(this.setMyFilter());
  }

  changeCustomer(e: Event) {
    console.log(this.filterForm.get('customer')?.value);
    this.filterList(this.setMyFilter());
  }

  changeCountry(e: Event) {
    console.log(this.filterForm.get('country')?.value);
    this.filterList(this.setMyFilter());
  }

  changeState(e: Event) {
    console.log(this.filterForm.get('isPaid')?.value?.valueOf());
    console.log(this.filterForm.get('isSubmitted')?.value?.valueOf());
    this.filterList(this.setMyFilter());
  }

  filterList(filter?: FilterObject) {
    console.log(filter, 'filter');
    let dateFrom = moment(new Date(2010, 7, 1));
    let dateUntil = moment(new Date(2100, 11, 31));

    if (filter?.start !== undefined && filter?.start.length > 0) {
      dateFrom = moment(filter.start);
    }

    if (filter?.end !== undefined && filter?.end.length > 0) {
      dateUntil = moment(filter.end);
    }

    const filtered = this.travels.filter((travel) => {
      let travelStart = moment(travel.startDate);
      let travelEnd = moment(travel.endDate);
      let travelCustomer = filter?.customer;
      let travelCountry = filter?.country;
      // Wenn Filter gesetzt, dann Flag True sonst Flag von der Travel
      let isSubmitted =
        filter?.isSubmitted === 'true'
          ? true
          : filter?.isSubmitted === 'false'
          ? false
          : travel.isSubmitted;
      // Wenn Filter gesetzt, dann Flag True sonst Flag von der Travel
      let isPaid =
        filter?.isPaid === 'true'
          ? true
          : filter?.isPaid === 'false'
          ? false
          : travel.isPaid;

      return (
        travelStart.isSameOrAfter(dateFrom) &&
        travelEnd.isSameOrBefore(dateUntil) &&
        travel.customer.includes(travelCustomer as string) &&
        travel.country.includes(travelCountry as string) &&
        travel.isSubmitted === isSubmitted &&
        travel.isPaid === isPaid
      );
    });

    this.filteredTravels = filtered;
    console.log(this.filteredTravels, 'Filter');
  }

  resetFilterList() {
    this.filteredTravels = this.travels;
    this.filterForm.reset();
    this.filterForm.patchValue({
      customer: '',
      country: '',
    });
  }

  setMyFilter(): FilterObject {
    return {
      start: this.filterForm.get('filterStart')?.value?.toString(),
      end: this.filterForm.get('filterEnd')?.value?.toString(),
      customer: this.filterForm.get('customer')?.value?.toString(),
      country: this.filterForm.get('country')?.value?.toString(),
      isPaid: this.filterForm.get('isPaid')?.value?.toString(),
      isSubmitted: this.filterForm.get('isSubmitted')?.value?.toString(),
    };
  }

  addNewTravel() {
    this.router.navigate(['/createTravel']);
  }

  setIsSubmitted(id: number, state?: boolean) {
    console.log(id);
    this.dataService.getTravelById(id).subscribe((data) => {
      let myTravel = data;
      /*Wenn Status übergeben wird, dann diese verwenden*/
      if (state !== undefined) {
        myTravel.isSubmitted = state;
      } else {
        myTravel.isSubmitted = !myTravel.isSubmitted;
        /*Wenn nicht eingereicht, dann auch nicht bezahlt*/
        if (!myTravel.isSubmitted) {
          myTravel.isPaid = false;
        }
      }
      console.log(myTravel, 'Submit');
      this.dataService.createOrUpdateTravel(myTravel).subscribe();
      this.loadTravels();
    });
  }

  setIsPaid(id: number) {
    console.log(id);
    this.dataService.getTravelById(id).subscribe((data) => {
      let myTravel = data;
      myTravel.isPaid = !myTravel.isPaid;
      /*Wenn bezahlt dann auch eingereicht*/
      if (myTravel.isPaid) {
        myTravel.isSubmitted = true;
      }
      this.dataService.createOrUpdateTravel(myTravel).subscribe();
      this.loadTravels();
    });
  }

  exportCsv() {
    let _csv = this.exportService.createCsv(this.filteredTravels);
    console.log(_csv, 'CSV');

    /*Selektierte Reise auf eingereicht setzen*/
    this.filteredTravels.forEach((element) => {
      this.setIsSubmitted(element.id, true);
    });
  }

  sendMail() {
    /*ToDo E-Mail Anhang*/
    console.log('start');

    let myEmail = 'ml2@abc.com';
    let myFile = 'C:\\Users\\lm280\\Downloads\\Report.csv';
    let mySubjekt = 'Reisekosten';
    let myBody = 'hallo';
    /* for (let index = 0; index < _csv.data.length; index++) {
      myBody += _csv.data[index].start;
    } */
    this.mailText =
      'mailto:' +
      myEmail +
      '?cc=secondemail@example.com&subject=' +
      mySubjekt +
      '&body=' +
      myBody +
      '&attachment=' +
      myFile;
    window.location.href = this.mailText;
    console.log('click');
  }
}
