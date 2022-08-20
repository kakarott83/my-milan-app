import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { map, take } from 'rxjs/operators';
import { Travel } from 'src/app/model/travel';
import { DataService } from 'src/app/services/data.service';
import { debounceTime } from "rxjs/operators";


@Component({
  selector: 'app-travel-list',
  templateUrl: './travel-list.component.html',
  styleUrls: ['./travel-list.component.scss']
})
export class TravelListComponent implements OnInit {

  isLoggedIn!: boolean;
  datesComplete: boolean = false
  travels: Travel[] = [];


  constructor(
    private authService: AuthService,
    private dataService: DataService
    ) { }

  ngOnInit(): void {
    /*this.authService.isLoggedIn.subscribe(x => {
      this.isLoggedIn = x;
      console.log(this.isLoggedIn, 'LoggedIn');
    })
    */
    this.dataService.getTravelsByUser()
      .pipe(debounceTime(5000))
      .subscribe(travels => {
        this.travels = travels;
        this.datesComplete = true
    })
  }

}
