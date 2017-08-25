// angular
import { BrowserModule }    from '@angular/platform-browser';
import { NgModule }         from '@angular/core';


// custom
//  modules
import { SharedModule }     from '../shared/shared.module';
import { CoreRouting }      from './core.routing';
//  components for this module
import { CoreLayoutComponent }  from './layout/core.layout.component';  // entry component
import { CoreTopbarComponent }  from './topbar/core.topbar.component';
import { CoreLoginComponent }   from './login/core.login.component';

import { Game3DComponent } from '../game/3D/game.3D.component';

@NgModule({
  declarations: [
    CoreLayoutComponent,
    CoreTopbarComponent,
    CoreLoginComponent,

    Game3DComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    CoreRouting
  ],
  exports: [
    SharedModule
  ],
  providers: [],
  bootstrap: [CoreLayoutComponent]
})
export class CoreModule { }
