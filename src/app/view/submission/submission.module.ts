import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubmissionRoutingModule } from './submission-routing.module';
import { SubmissionPageComponent } from './submission-page/submission-page.component';
import { EvaluationDatatableComponent } from './evaluation-datatable/evaluation-datatable.component';
import { ShareModule } from 'src/app/share/share.module';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    SubmissionPageComponent,
    EvaluationDatatableComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    DataTablesModule,
    SubmissionRoutingModule
  ]
})
export class SubmissionModule { }
