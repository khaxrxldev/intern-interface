import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionRoutingModule } from './question-routing.module';
import { QuestionListPageComponent } from './question-list-page/question-list-page.component';
import { QuestionDatatableComponent } from './question-datatable/question-datatable.component';
import { QuestionViewPageComponent } from './question-view-page/question-view-page.component';
import { ShareModule } from 'src/app/share/share.module';
import { DataTablesModule } from 'angular-datatables';
import { NgxEditorModule } from 'ngx-editor';
import { ReactiveFormsModule } from '@angular/forms';
import { PipeModule } from 'src/app/pipe/pipe.module';


@NgModule({
  declarations: [
    QuestionListPageComponent,
    QuestionDatatableComponent,
    QuestionViewPageComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    PipeModule,
    DataTablesModule,
    NgxEditorModule,
    ReactiveFormsModule,
    QuestionRoutingModule
  ]
})
export class QuestionModule { }
