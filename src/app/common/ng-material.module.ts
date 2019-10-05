import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatMenuModule,
  MatInputModule,
  MatListModule,
  MatFormFieldModule,
  MatAutocompleteModule,
  MatCardModule,
} from '@angular/material';


@NgModule({
  declarations: [
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatInputModule,
    MatListModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatCardModule,
  ],
  imports: [
    CommonModule
  ]
})
export class NgMaterialModule { }
