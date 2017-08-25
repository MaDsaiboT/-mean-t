import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'topBar',
  templateUrl: './core.topbar.component.html',
  styleUrls: ['./core.topbar.component.css']
})
export class CoreTopbarComponent implements OnInit {

  @Output() public registrationEnabled: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
