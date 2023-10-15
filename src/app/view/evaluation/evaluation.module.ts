import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvaluationRoutingModule } from './evaluation-routing.module';
import { EvaluationListPageComponent } from './evaluation-list-page/evaluation-list-page.component';
import { EvaluationDatatableComponent } from './evaluation-datatable/evaluation-datatable.component';
import { EvaluationViewPageComponent } from './evaluation-view-page/evaluation-view-page.component';
import { ShareModule } from 'src/app/share/share.module';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule } from '@angular/forms';
import { EvaluationCriteriaDatatableComponent } from './evaluation-criteria-datatable/evaluation-criteria-datatable.component';


@NgModule({
  declarations: [
    EvaluationListPageComponent,
    EvaluationDatatableComponent,
    EvaluationViewPageComponent,
    EvaluationCriteriaDatatableComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    DataTablesModule,
    ReactiveFormsModule,
    EvaluationRoutingModule
  ]
})
export class EvaluationModule { }
