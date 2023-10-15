import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { StudentAccountComponent } from './student-account/student-account.component';
import { ShareModule } from 'src/app/share/share.module';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule } from '@angular/forms';
import { IndustrySupervisorComponent } from './industry-supervisor/industry-supervisor.component';
import { AcademicSupervisorComponent } from './academic-supervisor/academic-supervisor.component';


@NgModule({
  declarations: [
    StudentAccountComponent,
    IndustrySupervisorComponent,
    AcademicSupervisorComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    DataTablesModule,
    ReactiveFormsModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
