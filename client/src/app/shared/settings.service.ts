import { Injectable } from '@angular/core';
import { Observable }       from 'rxjs/Observable';
import { Subject }          from 'rxjs/Subject';

import 'rxjs/add/operator/share';

export interface stateChange{
  propName?:string,
  oldVal?:any,
  newVal?:any
}

@Injectable()
export class SettingsService {


  private state = {
    fps:          30,
    showFPS:      true,
    antiAliasing: true,
    viewDistance: 7000
  };

  public settings = new Subject();
  public changeNotices$:Observable<stateChange> = this.settings.asObservable().share();

  constructor() { }

  changeState(prop:string,val:any){
    let oldVal = this.state[prop];
    if(oldVal == val) return; // no change
    this.state[prop] = val; // save new state
    this.settings.next( // emit state change notice
        {propName:prop, oldVal:oldVal, newVal:val}
    );
  }

  getState(prop:string){return this.state[prop];}
}
