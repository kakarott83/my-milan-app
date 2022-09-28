import { Observable } from 'rxjs';

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
  name = 'Michael Lange';
  time!: Observable<any>;
  year = new Date().getFullYear();
  travels: Travel[] = [];
  customer: string = '';
  openPayOut = 0;

  constructor(
    private router: Router,
    private timeService: TimeService,
    private dataService: DataService
  ) {
    this.time = timeService.getDate();
  }

  ngOnInit(): void {
    this.dataService.getTravelsByUser().subscribe((data) => {
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
