import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndustrySvRoutingModule } from './industry-sv-routing.module';
import { IndustrySvListPageComponent } from './industry-sv-list-page/industry-sv-list-page.component';
import { IndustrySvViewPageComponent } from './industry-sv-view-page/industry-sv-view-page.component';
import { IndustrySvDatatableComponent } from './industry-sv-datatable/industry-sv-datatable.component';
import { IndustrySvStudentDatatableComponent } from './industry-sv-student-datatable/industry-sv-student-datatable.component';
import { ShareModule } from 'src/app/share/share.module';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    IndustrySvListPageComponent,
    IndustrySvViewPageComponent,
    IndustrySvDatatableComponent,
    IndustrySvStudentDatatableComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    DataTablesModule,
    ReactiveFormsModule,
    IndustrySvRoutingModule
  ]
})
export class IndustrySvModule { }
