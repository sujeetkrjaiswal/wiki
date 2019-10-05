import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentComponent } from './content.component';
import { MatToolbarModule, MatSidenavModule } from '@angular/material';
import { NgMaterialModule } from 'src/app/common/ng-material.module';
import { CommentModule } from 'src/app/common/comment/comment.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
@NgModule({
  declarations: [ContentComponent],
  exports: [ContentComponent],
  imports: [
    CommonModule,
    NgMaterialModule,
    MatToolbarModule,
    MatSidenavModule,
    CommentModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ContentModule { }
