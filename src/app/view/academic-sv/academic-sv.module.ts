import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcademicSvRoutingModule } from './academic-sv-routing.module';
import { AcademicSvListPageComponent } from './academic-sv-list-page/academic-sv-list-page.component';
import { AcademicSvViewPageComponent } from './academic-sv-view-page/academic-sv-view-page.component';
import { AcademicSvDatatableComponent } from './academic-sv-datatable/academic-sv-datatable.component';
import { AcademicSvStudentDatatableComponent } from './academic-sv-student-datatable/academic-sv-student-datatable.component';
import { ShareModule } from 'src/app/share/share.module';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AcademicSvListPageComponent,
    AcademicSvViewPageComponent,
    AcademicSvDatatableComponent,
    AcademicSvStudentDatatableComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    DataTablesModule,
    ReactiveFormsModule,
    AcademicSvRoutingModule
  ]
})
export class AcademicSvModule { }
