import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CriteriaRoutingModule } from './criteria-routing.module';
import { CriteriaDatatableComponent } from './criteria-datatable/criteria-datatable.component';
import { CriteriaListPageComponent } from './criteria-list-page/criteria-list-page.component';
import { ShareModule } from 'src/app/share/share.module';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule } from '@angular/forms';
import { CriteriaViewPageComponent } from './criteria-view-page/criteria-view-page.component';
import { CriteriaQuestionDatatableComponent } from './criteria-question-datatable/criteria-question-datatable.component';


@NgModule({
  declarations: [
    CriteriaDatatableComponent,
    CriteriaListPageComponent,
    CriteriaViewPageComponent,
    CriteriaQuestionDatatableComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    DataTablesModule,
    ReactiveFormsModule,
    CriteriaRoutingModule
  ]
})
export class CriteriaModule { }
