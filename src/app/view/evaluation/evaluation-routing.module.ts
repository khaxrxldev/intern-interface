import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvaluationListPageComponent } from './evaluation-list-page/evaluation-list-page.component';
import { EvaluationViewPageComponent } from './evaluation-view-page/evaluation-view-page.component';

const routes: Routes = [
  {
    path: 'list',
    component: EvaluationListPageComponent
  }, {
    path: 'view/:evaluationId',
    component: EvaluationViewPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluationRoutingModule { }
