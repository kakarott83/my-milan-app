import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  disabledNavbar: boolean = true;
  
  constructor() { }

  ngOnInit(): void {
  }

}
