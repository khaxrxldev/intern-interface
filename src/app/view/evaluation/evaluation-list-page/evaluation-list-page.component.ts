import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/share/modal/modal.component';
import { ToastComponent } from 'src/app/share/toast/toast.component';
import { EvaluationDatatableComponent } from '../evaluation-datatable/evaluation-datatable.component';
import { InternCoreService } from 'src/app/service/intern-core.service';
import { AppUtilityService } from 'src/app/service/app-utility.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EvaluationRequest } from 'src/app/model/Request/EvaluationRequest';
import { EvaluationResponse } from 'src/app/model/Response/EvaluationResponse';

@Component({
  selector: 'app-evaluation-list-page',
  templateUrl: './evaluation-list-page.component.html',
  styleUrls: ['./evaluation-list-page.component.css']
})
export class EvaluationListPageComponent implements OnInit {
  @ViewChild('modal') modal!: ModalComponent;
  @ViewChild('toast') toast!: ToastComponent;
  @ViewChild('datatable') datatable!: EvaluationDatatableComponent;

  submitStatus: boolean = false;

  subjectList: string[] = [];
  
  constructor(private internCoreService: InternCoreService, public appUtilityService: AppUtilityService) {}

  ngOnInit(): void {
    this.getFilterList();
  }

  getFilterList() {
    this.internCoreService.retrieveEvaluations().subscribe({
      next: (res) => {
        if (this.appUtilityService.isObjectNotEmpty(res.data)) {
          let evaluations: EvaluationResponse[] = res.data.evaluations;

          if (evaluations.length > 0) {
            evaluations.forEach((evaluation: EvaluationResponse) => {
              this.subjectList.push(evaluation.evaluationSubject!);
            });
          }

          this.subjectList = this.subjectList.filter((item, index) => this.subjectList.indexOf(item) === index).sort();
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  evaluationFormGroup: FormGroup = new FormGroup({
    evaluationId: new FormControl(null, [ ]),
    evaluationName: new FormControl(null, [ Validators.required ]),
    evaluationCategory: new FormControl(null, [ Validators.required ]),
    evaluationPart: new FormControl(null, [ Validators.required ]),
    evaluationSubject: new FormControl(null, [ Validators.required ]),
  });

  onSubmitForm() {
    this.submitStatus = true;
    if (this.evaluationFormGroup.invalid) {
      return;
    }

    let evaluation: EvaluationRequest = {
      evaluationId: this.evaluationFormGroup.controls['evaluationId'].value,
      evaluationName: this.evaluationFormGroup.controls['evaluationName'].value,
      evaluationCategory: this.evaluationFormGroup.controls['evaluationCategory'].value,
      evaluationPart: this.evaluationFormGroup.controls['evaluationPart'].value,
      evaluationSubject: this.evaluationFormGroup.controls['evaluationSubject'].value,
    }

    if (!this.evaluationFormGroup.controls['evaluationId'].value) {
      this.onInsertEvaluation(evaluation);
    } else {
      this.onUpdateEvaluation(evaluation);
    }
  }

  onInsertEvaluation(evaluation: EvaluationRequest) {
    this.internCoreService.insertEvaluation(evaluation).subscribe({
      next: (res) => {
        if (this.appUtilityService.isObjectNotEmpty(res.data)) {
          this.toast.open(res.message_desc!, 'success');
          this.datatable.reRender();
        } else {
          this.toast.open(res.error_desc!, 'danger');
        }

        this.submitStatus = false;
        this.evaluationFormGroup.reset();
        this.getFilterList();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onUpdateEvaluation(evaluation: EvaluationRequest) {
    this.internCoreService.updateEvaluation(evaluation).subscribe({
      next: (res) => {
        if (this.appUtilityService.isObjectNotEmpty(res.data)) {
          this.toast.open(res.message_desc!, 'success');
          this.datatable.reRender();
        } else {
          this.toast.open(res.error_desc!, 'danger');
        }

        this.submitStatus = false;
        this.evaluationFormGroup.reset();
        this.getFilterList();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onSetForm(evaluation: EvaluationResponse) {
    this.evaluationFormGroup.controls['evaluationId'].setValue(evaluation.evaluationId);
    this.evaluationFormGroup.controls['evaluationName'].setValue(evaluation.evaluationName);
    this.evaluationFormGroup.controls['evaluationCategory'].setValue(evaluation.evaluationCategory);
    this.evaluationFormGroup.controls['evaluationPart'].setValue(evaluation.evaluationPart);
    this.evaluationFormGroup.controls['evaluationSubject'].setValue(evaluation.evaluationSubject);
  }

  onConfirmDelete(deleteId: string) {
    this.internCoreService.deleteEvaluationByEvaluationId(deleteId).subscribe({
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
}
