import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentAccountComponent } from './student-account/student-account.component';
import { IndustrySupervisorComponent } from './industry-supervisor/industry-supervisor.component';
import { AcademicSupervisorComponent } from './academic-supervisor/academic-supervisor.component';

const routes: Routes = [
  {
    path: 'student',
    component: StudentAccountComponent
  }, {
    path: 'academic-sv',
    component: AcademicSupervisorComponent
  }, {
    path: 'industry-sv',
    component: IndustrySupervisorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
