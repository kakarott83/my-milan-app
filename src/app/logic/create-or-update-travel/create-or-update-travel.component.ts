import { Travel } from 'src/app/model/travel';
import { DataService } from 'src/app/services/data.service';

import { DatePipe, formatDate, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Calc } from '../../model/calc';
import { Country } from '../../model/country';
import { Customer } from '../../model/customer';
import { Spends } from '../../model/spends';
import { CalculationService } from '../../services/calculation.service';
import * as Utils from '../utils';

@Component({
  selector: 'app-create-or-update-travel',
  templateUrl: './create-or-update-travel.component.html',
  styleUrls: ['./create-or-update-travel.component.scss'],
})
export class CreateOrUpdateTravelComponent implements OnInit {
  //versteckt die Inputfelder bei neuen Kunden
  hideNewCustomer = false;
  disableFlag = true;
  spendCounter = 0;
  myTestStartDate = new Date(2022, 7, 29, 15);
  myTestEndDate = new Date(2022, 8, 1, 18);
  mySumRate = 0;
  rate = 0;
  spend = 0;
  sum = 0;

  myCalc: Calc = {
    spends: 0,
    rate: 0,
    sum: 0,
  };

  myCustomer: Customer = {
    id: 0,
    name: '',
    city: '',
    country: '',
  };

  myTravel: Travel = {
    id: 0,
    startDate: new Date(),
    endDate: new Date(),
    customer: '',
    city: '',
    country: '',
    reason: '',
    rate: 0,
    halfRate: 0,
    isPaid: false,
    isSubmitted: false,
    hasBreakfast: true,
    hasLaunch: false,
    hasDinner: false,
    user: '',
    spends: [],
  };

  myTravelForm = this.fb.group({
    id: [''],
    startDate: [Date.now().toString(), Validators.required],
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
    hasBreakfast: [''],
    hasLaunch: [''],
    hasDinner: [''],
    spends: this.fb.array([]),
  });

  myCountry: Country = {
    id: 0,
    name: '',
    rate: 0,
    halfRate: 0,
  };

  myTestSpend: Spends = {
    type: 'Auto',
    value: 15,
    spendDate: new Date(2022, 8, 16),
  };

  customerList: Customer[] = [];
  countryList: Country[] = [];

  get spends(): FormArray {
    return this.myTravelForm.controls['spends'] as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private router: Router,
    private datePipe: DatePipe,
    private location: Location,
    private calcService: CalculationService
  ) {}

  ngOnInit(): void {
    let start = new Date();
    start.setDate(start.getDate() - 2);
    start.setHours(14);
    start.setMinutes(0);
    let end = new Date();
    end.setDate(end.getDate() + 3);
    end.setHours(18);
    end.setMinutes(0);

    this.dataService.getCustomers().subscribe((result) => {
      this.customerList = result;
    });

    this.dataService.getCountries().subscribe((result) => {
      this.countryList = result;
    });

    if (this.router.url != '/createTravel') {
      var id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      this.dataService.getTravelById(id).subscribe((result) => {
        this.myTravel = result;
        console.log(this.myTravel.hasLaunch, 'Load1');
        console.log(this.myTravel.hasLaunch ? 'true' : 'false', 'Load2');

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
          hasBreakfast: this.myTravel.hasBreakfast ? 'true' : 'false',
          hasLaunch: this.myTravel.hasLaunch ? 'true' : 'false',
          hasDinner: this.myTravel.hasDinner ? 'true' : 'false',
          spends: [],
        });

        //Spends hinzufügen
        this.myTravel.spends.forEach((element) => {
          this.addSpend(element);
        });

        //Flags setzen
        this.myTravelForm.controls['hasDinner'].setValue('false');
      });
    } else {
      console.log(Utils.Utils.middleOfLastWeekFromNow(), 'Test');
      this.myTravelForm.patchValue({
        startDate: String(
          this.datePipe.transform(
            Utils.Utils.firstOfLastWeekFromNow(),
            'yyyy-MM-dd'
          )
        ),
        startTime: String(
          this.datePipe.transform(Utils.Utils.firstOfLastWeekFromNow(), 'HH:mm')
        ),
        endDate: String(
          this.datePipe.transform(
            Utils.Utils.middleOfLastWeekFromNow(),
            'yyyy-MM-dd'
          )
        ),
        endTime: String(
          this.datePipe.transform(
            Utils.Utils.middleOfLastWeekFromNow(),
            'HH:mm'
          )
        ),
        hasBreakfast: 'true',
      });
      this.myTravel.startDate = start;
      this.myTravel.endDate = end;
    }

    this.setDisabled();
  }

  setDisabled() {
    this.myTravelForm.controls['city'].disable();
    this.myTravelForm.controls['country'].disable();
    this.myTravelForm.get('hasLaunch')?.disable();
    this.myTravelForm.get('hasDinner')?.disable();
  }

  changeValue() {
    this.setMyTravel();
    console.log(this.myTravel, 'Change');
    this.myCalc = this.calcService.calculation(this.myTravel);
    if (this.myCalc.rate !== undefined) {
      this.rate = this.myCalc.rate.valueOf();
      this.sum = this.rate;
    }
    if (this.myCalc.spends !== undefined) {
      this.spend = this.myCalc.spends.valueOf();
      this.sum = this.sum + this.spend;
    }
  }

  submit() {
    this.setMyTravel();
    console.log(this.myTravel, 'Submit');

    this.dataService.createOrUpdateTravel(this.myTravel).subscribe();
    this.router.navigate(['/travel-list']);
  }

  dateChanged(event: Event, isStart: boolean) {
    var val = (event.target as HTMLInputElement).value;

    if (isStart) {
      this.myTravel.startDate = new Date(val);
    } else {
      this.myTravel.endDate = new Date(val);
    }
  }

  setMyTravel() {
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
      this.myTravel.hasBreakfast = this.myTravelForm.get('hasBreakfast')?.value
        ? true
        : false;
      this.myTravel.hasLaunch = this.myTravelForm.get('hasLaunch')?.value
        ? true
        : false;
      this.myTravel.hasDinner = this.myTravelForm.get('hasDinner')?.value
        ? true
        : false;

      this.myTravel.spends = this.myTravelForm.get('spends')?.value as Spends[];
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

  public addSpendButton(type: string): void {
    this.spends.push(this._addSpend(type));
  }

  private _addSpend(type?: string): FormGroup {
    return this.fb.group({
      type: [type],
      value: [''],
      spendDate: [''],
    });
  }

  public deleteSpend(index: number): void {
    this.spends.removeAt(index);
    this.changeValue();
  }

  public back(): void {
    this.location.back();
  }

  changeCustomer(e: any) {
    let cname = this.myTravelForm.get('customer')?.value;
    let ccountry = '';
    if (cname !== undefined) {
      let ctemp = this.customerList.find((e) => e.name === cname)?.country;
      if (ctemp !== undefined) {
        ccountry = ctemp;
      }
    }

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

      if (ccountry !== undefined) {
        let c = this.countryList.find((e) => e.name === ccountry);
        if (c !== undefined) {
          this.myTravel.halfRate = c.halfRate;
          this.myTravel.rate = c.rate;
        }
      }
    }
  }
}
