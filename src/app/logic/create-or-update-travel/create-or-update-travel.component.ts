import { Travel } from 'src/app/model/travel';
import { DataService } from 'src/app/services/data.service';

import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Customer } from '../../model/customer';
import { Spends } from '../../model/spends';

@Component({
  selector: 'app-create-or-update-travel',
  templateUrl: './create-or-update-travel.component.html',
  styleUrls: ['./create-or-update-travel.component.scss'],
})
export class CreateOrUpdateTravelComponent implements OnInit {
  //versteckt die Inputfelder bei neuen Kunden
  hideNewCustomer = false;
  spendCounter = 0;

  myCustomer: Customer = {
    id: 0,
    name: '',
    city: '',
    country: '',
  };

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private router: Router,
    private datePipe: DatePipe,
    private location: Location
  ) {}

  myTravel: Travel = {
    id: 0,
    startDate: new Date(),
    endDate: new Date(),
    customer: '',
    city: '',
    country: '',
    reason: '',
    isPaid: false,
    isSubmitted: false,
    user: '',
    spends: [],
  };

  myTravelForm = this.fb.group({
    id: [''],
    startDate: ['', Validators.required],
    startTime: ['', Validators.required],
    endDate: ['', Validators.required],
    endTime: ['', Validators.required],
    customer: ['', Validators.required],
    city: ['', Validators.required],
    country: ['', Validators.required],
    customerNew: ['', Validators.required],
    cityNew: ['', Validators.required],
    countryNew: ['', Validators.required],
    reason: ['', Validators.required],
    isPaid: [''],
    isSubmitted: [''],
    spends: this.fb.array([]),
  });

  customerList: Customer[] = [];

  get spends(): FormArray {
    return this.myTravelForm.controls['spends'] as FormArray;
  }

  ngOnInit(): void {
    this.dataService.getCustomers().subscribe((result) => {
      this.customerList = result;
    });

    if (this.router.url != '/createTravel') {
      var id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      this.dataService.getTravelById(id).subscribe((result) => {
        this.myTravel = result;

        this.myTravelForm.setValue({
          id: String(this.myTravel.id),
          startDate: String(
            this.datePipe.transform(this.myTravel.startDate, 'yyyy-MM-dd')
          ),
          startTime: String(
            this.datePipe.transform(this.myTravel.startDate, 'hh:mm')
          ),
          endDate: String(
            this.datePipe.transform(this.myTravel.endDate, 'yyyy-MM-dd')
          ),
          endTime: String(
            this.datePipe.transform(this.myTravel.endDate, 'hh:mm')
          ),
          customer: this.myTravel.customer,
          customerNew: '',
          countryNew: '',
          cityNew: '',
          country: this.myTravel.country,
          reason: this.myTravel.reason,
          city: this.myTravel.city,
          isPaid: this.myTravel.isPaid ? 'true' : 'false',
          isSubmitted: this.myTravel.isSubmitted ? 'true' : 'false',
          spends: [],
        });

        //Spends hinzufügen
        this.myTravel.spends.forEach((element) => {
          this.addSpend(element);
        });
      });
    }

    this.setDiabled();
  }

  setDiabled() {
    this.myTravelForm.controls['city'].disable();
    this.myTravelForm.controls['country'].disable();
  }

  submit() {
    var start = this.myTravelForm.get('startDate')?.value?.split('-');
    var end = this.myTravelForm.get('endDate')?.value?.split('-');
    var startTime = this.myTravelForm.get('startTime')?.value?.split(':');
    var endTime = this.myTravelForm.get('endTime')?.value?.split(':');
    if (
      start !== undefined &&
      end !== undefined &&
      startTime !== undefined &&
      endTime !== undefined &&
      this.myTravelForm.value !== undefined
    ) {
      this.myTravel.startDate = new Date(
        Number(start[0]),
        Number(start[1]),
        Number(start[2]),
        Number(startTime[0]),
        Number(startTime[1])
      );
      this.myTravel.endDate = new Date(
        Number(end[0]),
        Number(end[1]),
        Number(end[2]),
        Number(endTime[0]),
        Number(endTime[1])
      );
      this.myTravel.customer =
        this.myTravelForm.get('customer') !== undefined
          ? (this.myTravelForm.get('customer')?.value as string)
          : (this.myTravelForm.get('customerNew')?.value as string);

      this.myTravel.country =
        this.myTravelForm.get('country') !== undefined
          ? (this.myTravelForm.get('country')?.value as string)
          : (this.myTravelForm.get('countryNew')?.value as string);

      this.myTravel.city =
        this.myTravelForm.get('city') !== undefined
          ? (this.myTravelForm.get('city')?.value as string)
          : (this.myTravelForm.get('cityNew')?.value as string);

      this.myTravel.reason = this.myTravelForm.get('reason')?.value as string;
      this.myTravel.isPaid = this.myTravelForm.get('isPaid')?.value
        ? true
        : false;
      this.myTravel.isSubmitted = this.myTravelForm.get('isSubmitted')?.value
        ? true
        : false;

      this.myTravel.spends = this.myTravelForm.get('spends')?.value as Spends[];

      this.dataService.createOrUpdateTravel(this.myTravel).subscribe();
      this.router.navigate(['/travel-list']);
    }
  }

  dateChanged(event: Event, isStart: boolean) {
    var val = (event.target as HTMLInputElement).value;

    if (isStart) {
      this.myTravel.startDate = new Date(val);
    } else {
      this.myTravel.endDate = new Date(val);
    }
  }

  public addSpend(spend?: Spends): void {
    let spendForm: FormGroup;
    if (spend) {
      spendForm = this.fb.group({
        type: spend.type,
        value: spend.value,
        spendDate: this.datePipe.transform(spend.spendDate, 'yyyy-MM-dd'),
      });

      this.spends.push(spendForm);
    } else {
      this.spends.push(this._addSpend());
    }
    //console.log(this.myTravelForm.value);
  }

  private _addSpend(): FormGroup {
    return this.fb.group({
      type: [''],
      value: [''],
      spendDate: [''],
    });
  }

  public deleteSpend(index: number): void {
    this.spends.removeAt(index);
  }

  public back(): void {
    this.location.back();
  }

  changeCustomer(e: any) {
    var cname = this.myTravelForm.get('customer')?.value;

    if (cname === 'newCustomer') {
      this.hideNewCustomer = true;
    } else {
      this.hideNewCustomer = false;
      this.myCustomer = this.customerList.find(
        (e) => e.name === cname
      ) as Customer;

      if (this.myCustomer) {
        this.myTravelForm.patchValue({
          city: this.myCustomer.city,
          country: this.myCustomer.country,
        });
      }
    }
  }
}
