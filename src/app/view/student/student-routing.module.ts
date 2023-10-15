import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentListPageComponent } from './student-list-page/student-list-page.component';
import { StudentViewPageComponent } from './student-view-page/student-view-page.component';
import { StudentResultPageComponent } from './student-result-page/student-result-page.component';

const routes: Routes = [
  {
    path: 'list',
    component: StudentListPageComponent
  }, {
    path: 'evaluate',
    component: StudentListPageComponent
  }, {
    path: 'view/:studentId',
    component: StudentViewPageComponent
  }, {
    path: 'result/:studentId',
    component: StudentResultPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
