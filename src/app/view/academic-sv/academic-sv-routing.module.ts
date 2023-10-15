import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcademicSvListPageComponent } from './academic-sv-list-page/academic-sv-list-page.component';
import { AcademicSvViewPageComponent } from './academic-sv-view-page/academic-sv-view-page.component';

const routes: Routes = [
  {
    path: 'list',
    component: AcademicSvListPageComponent
  }, {
    path: 'view/:academicSvId',
    component: AcademicSvViewPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcademicSvRoutingModule { }
