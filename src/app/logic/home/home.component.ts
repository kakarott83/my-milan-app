import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Travel } from '../../model/travel';
import { DataService } from '../../services/data.service';
import { TimeService } from '../../services/time.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  name!: Observable<any>;
  time!: Observable<any>;
  year = new Date().getFullYear();
  travels: Travel[] = [];
  customer: string = '';
  openPayOut = 0;
  userName: any;
  user: any;

  constructor(
    private router: Router,
    private timeService: TimeService,
    private dataService: DataService,
    private authService: AuthService
  ) {
    this.time = timeService.getDate();
    /*this.getName()
      .then((x) => (this.name = x))
      .catch((err) => (this.name = err));*/
    this.user = authService.getUserId();
    this.name = this.user.displayName;
  }

  ngOnInit(): void {
    this.dataService
      .getTravelsByUserFs()
      .pipe(
        map((travels: any[]) =>
          travels.map((travel) => ({
            ...travel,
            startDate: travel.startDate.toDate(),
            endDate: travel.endDate.toDate(),
          }))
        )
      )
      .pipe(
        map((travels: any[]) =>
          travels.filter((f) => {
            return f.user === this.user.uid;
          })
        )
      )

      .subscribe((data) => {
        this.travels = data;
        this.customer = this.travels[this.travels.length - 1].customer;
        let filteredTravel = this.travels.filter((x) => {
          return x.isPaid === false && x.isSubmitted == true;
        });
        filteredTravel.forEach((element) => {
          this.openPayOut += +element.payout;
        });
      });
  }
}
