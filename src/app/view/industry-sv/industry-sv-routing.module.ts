import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndustrySvListPageComponent } from './industry-sv-list-page/industry-sv-list-page.component';
import { IndustrySvViewPageComponent } from './industry-sv-view-page/industry-sv-view-page.component';

const routes: Routes = [
  {
    path: 'list',
    component: IndustrySvListPageComponent
  }, {
    path: 'view/:industrySvId',
    component: IndustrySvViewPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndustrySvRoutingModule { }
