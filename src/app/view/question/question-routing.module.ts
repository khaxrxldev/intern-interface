import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionListPageComponent } from './question-list-page/question-list-page.component';
import { QuestionViewPageComponent } from './question-view-page/question-view-page.component';

const routes: Routes = [
  {
    path: 'list',
    component: QuestionListPageComponent
  }, {
    path: 'view/:questionId',
    component: QuestionViewPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionRoutingModule { }
