import { Observable } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TimeService } from '../../services/time.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  name = 'Michael Lange';
  time!: Observable<any>;

  constructor(private router: Router, private timeService: TimeService) {
    this.time = timeService.getDate();
  }

  ngOnInit(): void {}
}
