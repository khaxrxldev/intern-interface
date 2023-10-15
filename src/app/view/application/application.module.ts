import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationRoutingModule } from './application-routing.module';
import { ApplicationListPageComponent } from './application-list-page/application-list-page.component';
import { ApplicationListDatatableComponent } from './application-list-datatable/application-list-datatable.component';
import { ApplicationResultDatatableComponent } from './application-result-datatable/application-result-datatable.component';
import { ShareModule } from 'src/app/share/share.module';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    ApplicationListPageComponent,
    ApplicationListDatatableComponent,
    ApplicationResultDatatableComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    DataTablesModule,
    ApplicationRoutingModule
  ]
})
export class ApplicationModule { }
