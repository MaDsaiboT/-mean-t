import { Component, ViewEncapsulation, Output }      from '@angular/core';
import { RouterModule, RouterOutlet}   from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './core.layout.html',
  styleUrls: ['./core.layout.css'],
  encapsulation: ViewEncapsulation.None
})
export class CoreLayoutComponent {

  logDebug(text) {
    console.log(text);
  }
}
