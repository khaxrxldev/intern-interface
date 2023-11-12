import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShareModule } from './share/share.module';
import { CompanyApprovalComponent } from './page/company-approval/company-approval.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { SignInComponent } from './page/sign-in/sign-in.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from './page/loader/loader.component';
import { ServiceInterceptor } from './service/service.interceptor';
import { SignUpComponent } from './page/sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BlankComponent } from './page/blank/blank.component';

@NgModule({
  declarations: [
    AppComponent,
    CompanyApprovalComponent,
    DashboardComponent,
    SignInComponent,
    LoaderComponent,
    SignUpComponent,
    BlankComponent
  ],
  imports: [
    ShareModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ServiceInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
