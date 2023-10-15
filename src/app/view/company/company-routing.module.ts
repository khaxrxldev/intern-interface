import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyListPageComponent } from './company-list-page/company-list-page.component';
import { CompanyViewPageComponent } from './company-view-page/company-view-page.component';

const routes: Routes = [
  {
    path: 'list',
    component: CompanyListPageComponent
  }, {
    path: 'view/:companyId',
    component: CompanyViewPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
