import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentListPageComponent } from './student-list-page/student-list-page.component';
import { DataTablesModule } from 'angular-datatables';
import { StudentViewPageComponent } from './student-view-page/student-view-page.component';
import { ShareModule } from 'src/app/share/share.module';
import { StudentResultPageComponent } from './student-result-page/student-result-page.component';
import { StudentEvaluationDatatableComponent } from './student-evaluation-datatable/student-evaluation-datatable.component';
import { StudentApplicationDatatableComponent } from './student-application-datatable/student-application-datatable.component';
import { StudentDatatableComponent } from './student-datatable/student-datatable.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PipeModule } from 'src/app/pipe/pipe.module';


@NgModule({
  declarations: [
    StudentListPageComponent,
    StudentViewPageComponent,
    StudentResultPageComponent,
    StudentEvaluationDatatableComponent,
    StudentApplicationDatatableComponent,
    StudentDatatableComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    PipeModule,
    DataTablesModule,
    ReactiveFormsModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
