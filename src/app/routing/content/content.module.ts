import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentComponent } from './content.component';
import { MatToolbarModule, MatSidenavModule } from '@angular/material';
import { NgMaterialModule } from 'src/app/common/ng-material.module';
@NgModule({
  declarations: [ContentComponent],
  exports: [ContentComponent],
  imports: [
    CommonModule,
    NgMaterialModule,
    MatToolbarModule,
    MatSidenavModule
  ]
})
export class ContentModule { }
