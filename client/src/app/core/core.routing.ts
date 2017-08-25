import { NgModule }                              from '@angular/core';
import { RouterModule, Routes, Route }           from '@angular/router';
import { PreloadingStrategy, PreloadAllModules } from '@angular/router';

import { SharedModule }       from '../shared/shared.module';
import { NotFoundComponent }  from '../shared/not-found/not-found.component';
import { CoreLoginComponent }  from './login/core.login.component';

const appRoutes: Routes = [
  {path: 'login',     component: CoreLoginComponent},
  {path: '**',        component: NotFoundComponent}
]

@NgModule({
  imports:   [
    SharedModule,
    RouterModule.forRoot(appRoutes ,
      {preloadingStrategy: PreloadAllModules})
    ],
  exports:   [
      RouterModule
  ],
  providers: [

  ]
})
export class CoreRouting {
  constructor () {
    console.log('main router beeing  constructet');
  }
}
