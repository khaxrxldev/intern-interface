import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Editor, Toolbar } from 'ngx-editor';
import { ModalComponent } from 'src/app/share/modal/modal.component';
import { ToastComponent } from 'src/app/share/toast/toast.component';
import { QuestionDatatableComponent } from '../question-datatable/question-datatable.component';
import { InternCommonService } from 'src/app/service/intern-common.service';
import { AppUtilityService } from 'src/app/service/app-utility.service';
import { QuestionRequest } from 'src/app/model/Request/QuestionRequest';
import { QuestionResponse } from 'src/app/model/Response/QuestionResponse';
import { CriteriaResponse } from 'src/app/model/Response/CriteriaResponse';
import { InternCoreService } from 'src/app/service/intern-core.service';

@Component({
  selector: 'app-question-list-page',
  templateUrl: './question-list-page.component.html',
  styleUrls: ['./question-list-page.component.css']
})
export class QuestionListPageComponent implements OnInit, OnDestroy {
  @ViewChild('modal') modal!: ModalComponent;
  @ViewChild('toast') toast!: ToastComponent;
  @ViewChild('datatable') datatable!: QuestionDatatableComponent;
  
  editorContent!: string;
  submitStatus: boolean = false;
  criterias: CriteriaResponse[] = [];

  constructor(private internCommonService: InternCommonService, private internCoreService: InternCoreService, public appUtilityService: AppUtilityService) {}

  ngOnInit(): void {
    this.editor = new Editor();

    this.internCoreService.retrieveCriterias().subscribe({
      next: (res) => {
        if (this.appUtilityService.isObjectNotEmpty(res.data)) {
          this.criterias = res.data.criterias;
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  questionFormGroup = new FormGroup({
    questionId: new FormControl('', [ ]),
    questionNumber: new FormControl('', [ Validators.required ]),
    questionDesc: new FormControl('', [ Validators.required ]),
    questionCategoryCode: new FormControl('', []),
    questionCategoryDesc: new FormControl('', []),
    questionWeightage: new FormControl('', [ Validators.required ]),
    questionTotalMark: new FormControl('', [ Validators.required ]),
    criteriaId: new FormControl('', [ Validators.required ])
  })

  onSubmitForm() {
    this.submitStatus = true;
    if (this.questionFormGroup.invalid) {
      return;
    }

    let filterPDesc = this.questionFormGroup.value.questionDesc!;
    filterPDesc = filterPDesc.replaceAll('<p>', '<div>');
    filterPDesc = filterPDesc.replaceAll('</p>', '</div>');

    let question: QuestionRequest = {
      questionId: this.questionFormGroup.controls['questionId'].value!,
      questionNumber: this.questionFormGroup.controls['questionNumber'].value!,
      questionDesc: filterPDesc,
      questionCategoryCode: this.questionFormGroup.controls['questionCategoryCode'].value!,
      questionCategoryDesc: this.questionFormGroup.controls['questionCategoryDesc'].value!,
      questionWeightage: +this.questionFormGroup.controls['questionWeightage'].value!,
      questionTotalMark: +this.questionFormGroup.controls['questionTotalMark'].value!,
      criteriaId: this.questionFormGroup.controls['criteriaId'].value!,
    }

    if (!this.questionFormGroup.value.questionId) {
      this.onInsertQuestion(question);
    } else {
      this.onUpdateQuestion(question);
    }
  }

  onInsertQuestion(question: QuestionRequest) {
    this.internCommonService.insertQuestion(question).subscribe({
      next: (res) => {
        if (this.appUtilityService.isObjectNotEmpty(res.data)) {
          this.toast.open(res.message_desc!, 'success');
          this.datatable.reRender();
        } else {
          this.toast.open(res.error_desc!, 'danger');
        }

        this.submitStatus = false;
        this.questionFormGroup.reset();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onUpdateQuestion(question: QuestionRequest) {
    this.internCommonService.updateQuestion(question).subscribe({
      next: (res) => {
        if (this.appUtilityService.isObjectNotEmpty(res.data)) {
          this.toast.open(res.message_desc!, 'success');
          this.datatable.reRender();
        } else {
          this.toast.open(res.error_desc!, 'danger');
        }

        this.submitStatus = false;
        this.questionFormGroup.reset();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onSetForm(question: QuestionResponse) {
    this.questionFormGroup.controls['questionId'].setValue(question.questionId!);
    this.questionFormGroup.controls['questionNumber'].setValue(question.questionNumber!);
    this.questionFormGroup.controls['questionDesc'].setValue(question.questionDesc!);
    this.questionFormGroup.controls['questionCategoryCode'].setValue(question.questionCategoryCode?.toString()!);
    this.questionFormGroup.controls['questionCategoryDesc'].setValue(question.questionCategoryDesc?.toString()!);
    this.questionFormGroup.controls['questionWeightage'].setValue(question.questionWeightage?.toString()!); 
    this.questionFormGroup.controls['questionTotalMark'].setValue(question.questionTotalMark?.toString()!);
    this.questionFormGroup.controls['criteriaId'].setValue(question.criteriaId?.toString()!);
  }
  
  onConfirmDelete(deleteId: string) {
    this.internCommonService.deleteQuestionByQuestionId(deleteId).subscribe({
      next: (res) => {
        if (res.message_status) {
          this.toast.open(res.message_desc!, 'success');
          this.datatable.reRender();
        } else {
          this.toast.open(res.error_desc!, 'danger');
        }

        this.modal.close();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  
  editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic', 'underline', 'strike'],
    ['code', 'blockquote'],
    ['bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
}