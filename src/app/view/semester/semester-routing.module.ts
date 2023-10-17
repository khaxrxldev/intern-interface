import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SemesterListPageComponent } from './semester-list-page/semester-list-page.component';
import { SemesterViewPageComponent } from './semester-view-page/semester-view-page.component';

const routes: Routes = [
  {
    path: 'list',
    component: SemesterListPageComponent
  }, {
    path: 'view/:semesterId',
    component: SemesterViewPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SemesterRoutingModule { }
