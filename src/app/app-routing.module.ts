import { NgModule, inject } from '@angular/core';
import { CanMatchFn, Route, Router, RouterModule, Routes, UrlSegment } from '@angular/router';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { CompanyApprovalComponent } from './page/company-approval/company-approval.component';
import { SignInComponent } from './page/sign-in/sign-in.component';
import { SignUpComponent } from './page/sign-up/sign-up.component';

const canMatchFn: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  const router: Router = inject(Router);

  if (sessionStorage.getItem('userId')) {
    return true;
  } else {
    router.navigate([]);
    return false;
  }
};

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'account',
        loadChildren: () => import('./view/account/account.module').then((module) => module.AccountModule), canMatch: [canMatchFn]
      }, {
        path: 'student',
        loadChildren: () => import('./view/student/student.module').then((module) => module.StudentModule), canMatch: [canMatchFn]
      }, {
        path: 'company',
        loadChildren: () => import('./view/company/company.module').then((module) => module.CompanyModule), canMatch: [canMatchFn]
      }, {
        path: 'evaluation',
        loadChildren: () => import('./view/evaluation/evaluation.module').then((module) => module.EvaluationModule), canMatch: [canMatchFn]
      }, {
        path: 'criteria',
        loadChildren: () => import('./view/criteria/criteria.module').then((module) => module.CriteriaModule), canMatch: [canMatchFn]
      }, {
        path: 'question',
        loadChildren: () => import('./view/question/question.module').then((module) => module.QuestionModule), canMatch: [canMatchFn]
      }, {
        path: 'application',
        loadChildren: () => import('./view/application/application.module').then((module) => module.ApplicationModule), canMatch: [canMatchFn]
      }, {
        path: 'submission',
        loadChildren: () => import('./view/submission/submission.module').then((module) => module.SubmissionModule), canMatch: [canMatchFn]
      }, {
        path: 'academic-sv',
        loadChildren: () => import('./view/academic-sv/academic-sv.module').then((module) => module.AcademicSvModule), canMatch: [canMatchFn]
      }, {
        path: 'industry-sv',
        loadChildren: () => import('./view/industry-sv/industry-sv.module').then((module) => module.IndustrySvModule), canMatch: [canMatchFn]
      }
    ]
  }, {
    path: '',
    component: SignInComponent
  }, {
    path: 'signup',
    component: SignUpComponent
  }, {
    path: 'company-approval/:applicationId',
    component: CompanyApprovalComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
