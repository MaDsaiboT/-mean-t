import { Component }  from '@angular/core';
import {THREE}        from 'three';

@Component({
  selector: 'game-3D',
  templateUrl: './game.3D.component.html',
  styleUrls: ['./game.3D.component.css']
})
export class Game3DComponent {

  logDebug(text) {
    console.log(text);
  }
}
