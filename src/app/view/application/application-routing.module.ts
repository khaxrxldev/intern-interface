import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationListPageComponent } from './application-list-page/application-list-page.component';

const routes: Routes = [
  {
    path: 'list',
    component: ApplicationListPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
