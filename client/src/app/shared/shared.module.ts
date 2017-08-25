// angular
import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

// custom
//  services
import { UserService }        from './user.service';
import { UserInputService }   from './user-input.service';
import { SettingsService }    from './settings.service';
//  components
import { NotFoundComponent }  from './not-found/not-found.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NotFoundComponent
  ],
  providers: [
    UserService,
    UserInputService,
    SettingsService
  ],
  exports:[
    NotFoundComponent
  ]
})
export class SharedModule { }
