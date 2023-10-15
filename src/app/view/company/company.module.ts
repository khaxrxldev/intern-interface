import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { CompanyListPageComponent } from './company-list-page/company-list-page.component';
import { CompanyViewPageComponent } from './company-view-page/company-view-page.component';
import { CompanyDatatableComponent } from './company-datatable/company-datatable.component';
import { ShareModule } from 'src/app/share/share.module';
import { DataTablesModule } from 'angular-datatables';
import { CompanySupervisorDatatableComponent } from './company-supervisor-datatable/company-supervisor-datatable.component';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { GoogleChartsModule } from 'angular-google-charts';


@NgModule({
  declarations: [
    CompanyListPageComponent,
    CompanyViewPageComponent,
    CompanyDatatableComponent,
    CompanySupervisorDatatableComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    DataTablesModule,
    GoogleChartsModule,
    NgbAccordionModule,
    ReactiveFormsModule,
    CompanyRoutingModule
  ]
})
export class CompanyModule { }
