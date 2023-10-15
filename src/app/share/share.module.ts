import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { AlertComponent } from './alert/alert.component';
import { NgbAccordionModule, NgbAlert, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ButtonGroupComponent } from './button-group/button-group.component';
import { SigninFormComponent } from './signin-form/signin-form.component';
import { AccordianComponent } from './accordian/accordian.component';
import { ToastComponent } from './toast/toast.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputDatetimeComponent } from './input-datetime/input-datetime.component';
import { MultiSelectFilterComponent } from './multi-select-filter/multi-select-filter.component';
import { PipeModule } from "../pipe/pipe.module";
import { SearchSelectComponent } from './search-select/search-select.component';

@NgModule({
    declarations: [
      ModalComponent,
      AlertComponent,
      ButtonGroupComponent,
      SigninFormComponent,
      AccordianComponent,
      ToastComponent,
      InputDatetimeComponent,
      MultiSelectFilterComponent,
      SearchSelectComponent
    ],
    exports: [
      ModalComponent,
      AlertComponent,
      ButtonGroupComponent,
      SigninFormComponent,
      AccordianComponent,
      ToastComponent,
      InputDatetimeComponent,
      MultiSelectFilterComponent,
      SearchSelectComponent
    ],
    imports: [
      CommonModule,
      NgbAlert,
      NgbAccordionModule,
      NgbToastModule,
      ReactiveFormsModule,
      PipeModule
    ]
})
export class ShareModule { }
