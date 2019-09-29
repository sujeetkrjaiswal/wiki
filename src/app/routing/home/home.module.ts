import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatCardModule } from '@angular/material';

import { HomeComponent } from './home.component';
import { NgMaterialModule } from 'src/app/common/ng-material.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [HomeComponent],
  exports: [HomeComponent],
  imports: [
    CommonModule,
    NgMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatCardModule,
    RouterModule
  ]
})
export class HomeModule { }
