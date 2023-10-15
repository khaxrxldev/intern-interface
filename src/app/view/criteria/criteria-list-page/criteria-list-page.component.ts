import { Component, OnInit, ViewChild } from '@angular/core';
import { EvaluationResponse } from 'src/app/model/Response/EvaluationResponse';
import { ModalComponent } from 'src/app/share/modal/modal.component';
import { ToastComponent } from 'src/app/share/toast/toast.component';
import { CriteriaDatatableComponent } from '../criteria-datatable/criteria-datatable.component';
import { InternCoreService } from 'src/app/service/intern-core.service';
import { AppUtilityService } from 'src/app/service/app-utility.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CriteriaRequest } from 'src/app/model/Request/CriteriaRequest';
import { CriteriaResponse } from 'src/app/model/Response/CriteriaResponse';

@Component({
  selector: 'app-criteria-list-page',
  templateUrl: './criteria-list-page.component.html',
  styleUrls: ['./criteria-list-page.component.css']
})
export class CriteriaListPageComponent implements OnInit {
  @ViewChild('modal') modal!: ModalComponent;
  @ViewChild('toast') toast!: ToastComponent;
  @ViewChild('datatable') datatable!: CriteriaDatatableComponent;

  submitStatus: boolean = false;
  evaluations: EvaluationResponse[] = [];
  
  constructor(private internCoreService: InternCoreService, public appUtilityService: AppUtilityService) {}

  ngOnInit(): void {
    this.internCoreService.retrieveEvaluations().subscribe({
      next: (res) => {
        if (this.appUtilityService.isObjectNotEmpty(res.data)) {
          this.evaluations = res.data.evaluations;
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  criteriaFormGroup: FormGroup = new FormGroup({
    criteriaId: new FormControl(null, [ ]),
    criteriaName: new FormControl(null, [ Validators.required ]),
    criteriaDesc: new FormControl(null, []),
    criteriaPercentage: new FormControl(null, [ Validators.min(0), Validators.max(100) ]),
    evaluationId: new FormControl(null, [ Validators.required ]),
  });

  onSubmitForm() {
    this.submitStatus = true;
    if (this.criteriaFormGroup.invalid) {
      return;
    }

    let criteria: CriteriaRequest = {
      criteriaId: this.criteriaFormGroup.controls['criteriaId'].value,
      criteriaName: this.criteriaFormGroup.controls['criteriaName'].value,
      criteriaDesc: this.criteriaFormGroup.controls['criteriaDesc'].value,
      criteriaPercentage: this.criteriaFormGroup.controls['criteriaPercentage'].value,
      evaluationId: this.criteriaFormGroup.controls['evaluationId'].value
    }

    if (!this.criteriaFormGroup.controls['criteriaId'].value) {
      this.onInsertcriteria(criteria);
    } else {
      this.onUpdatecriteria(criteria);
    }
  }

  onInsertcriteria(criteria: CriteriaRequest) {
    this.internCoreService.insertCriteria(criteria).subscribe({
      next: (res) => {
        if (this.appUtilityService.isObjectNotEmpty(res.data)) {
          this.toast.open(res.message_desc!, 'success');
          this.datatable.reRender();
        } else {
          this.toast.open(res.error_desc!, 'danger');
        }

        this.submitStatus = false;
        this.criteriaFormGroup.reset();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onUpdatecriteria(criteria: CriteriaRequest) {
    this.internCoreService.updateCriteria(criteria).subscribe({
      next: (res) => {
        if (this.appUtilityService.isObjectNotEmpty(res.data)) {
          this.toast.open(res.message_desc!, 'success');
          this.datatable.reRender();
        } else {
          this.toast.open(res.error_desc!, 'danger');
        }

        this.submitStatus = false;
        this.criteriaFormGroup.reset();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onSetForm(criteria: CriteriaResponse) {
    this.criteriaFormGroup.controls['criteriaId'].setValue(criteria.criteriaId);
    this.criteriaFormGroup.controls['criteriaName'].setValue(criteria.criteriaName);
    this.criteriaFormGroup.controls['criteriaDesc'].setValue(criteria.criteriaDesc);
    this.criteriaFormGroup.controls['criteriaPercentage'].setValue(criteria.criteriaPercentage);
    this.criteriaFormGroup.controls['evaluationId'].setValue(criteria.evaluationId);
  }

  onConfirmDelete(deleteId: string) {
    this.internCoreService.deleteCriteriaByCriteriaId(deleteId).subscribe({
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
