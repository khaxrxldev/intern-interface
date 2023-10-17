import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SemesterRoutingModule } from './semester-routing.module';
import { SemesterViewPageComponent } from './semester-view-page/semester-view-page.component';
import { SemesterListPageComponent } from './semester-list-page/semester-list-page.component';
import { SemesterDatatableComponent } from './semester-datatable/semester-datatable.component';
import { ShareModule } from 'src/app/share/share.module';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SemesterViewPageComponent,
    SemesterListPageComponent,
    SemesterDatatableComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    DataTablesModule,
    ReactiveFormsModule,
    SemesterRoutingModule
  ]
})
export class SemesterModule { }
