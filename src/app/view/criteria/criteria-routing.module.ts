import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CriteriaListPageComponent } from './criteria-list-page/criteria-list-page.component';
import { CriteriaViewPageComponent } from './criteria-view-page/criteria-view-page.component';

const routes: Routes = [
  {
    path: 'list',
    component: CriteriaListPageComponent
  }, {
    path: 'view/:criteriaId',
    component: CriteriaViewPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CriteriaRoutingModule { }
