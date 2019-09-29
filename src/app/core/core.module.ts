import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FirebaseModule } from './firebase.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FirebaseModule
  ],
  exports: [
    FirebaseModule
  ]
})
export class CoreModule {

}
