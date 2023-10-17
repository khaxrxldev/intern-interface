import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SemesterRequest } from 'src/app/model/Request/SemesterRequest';
import { AppUtilityService } from 'src/app/service/app-utility.service';
import { InternCommonService } from 'src/app/service/intern-common.service';
import { InputDatetimeComponent } from 'src/app/share/input-datetime/input-datetime.component';
import { ToastComponent } from 'src/app/share/toast/toast.component';
import { InputDateTime } from 'src/app/validator/input-date-time';
import { SemesterDatatableComponent } from '../semester-datatable/semester-datatable.component';
import { ModalComponent } from 'src/app/share/modal/modal.component';
import { SemesterResponse } from 'src/app/model/Response/SemesterResponse';

@Component({
  selector: 'app-semester-list-page',
  templateUrl: './semester-list-page.component.html',
  styleUrls: ['./semester-list-page.component.css']
})
export class SemesterListPageComponent {
  @ViewChild('modal') modal!: ModalComponent;
  @ViewChild('toast') toast!: ToastComponent;
  @ViewChild('datatable') datatable!: SemesterDatatableComponent;
  submitStatus: boolean = false;

  constructor(private internCommonService: InternCommonService, public appUtilityService: AppUtilityService) {}

  semesterFormGroup = new FormGroup({
    semesterId: new FormControl('', []),
    semesterCode: new FormControl('', [ Validators.required ]),
    semesterPart: new FormControl('', [ Validators.required ]),
    semesterStartEvaluateDate: new FormControl('', [ InputDateTime.validateDateTime() ]),
    semesterEndEvaluateDate: new FormControl('', [ InputDateTime.validateDateTime() ])
  })

  onSubmitForm(strDateDD: InputDatetimeComponent, strDateMM: InputDatetimeComponent, strDateYY: InputDatetimeComponent, strTimeHH: InputDatetimeComponent, strTimeMM: InputDatetimeComponent, strTimeAMPM: HTMLSelectElement, endDateDD: InputDatetimeComponent, endDateMM: InputDatetimeComponent, endDateYY: InputDatetimeComponent, endTimeHH: InputDatetimeComponent, endTimeMM: InputDatetimeComponent, endTimeAMPM: HTMLSelectElement) {
    this.semesterFormGroup.controls['semesterStartEvaluateDate'].setValue(this.appUtilityService.setInputDate(strDateDD.getInputValue(), strDateMM.getInputValue(), strDateYY.getInputValue(), strTimeHH.getInputValue(), strTimeMM.getInputValue(), strTimeAMPM.value));
    this.semesterFormGroup.controls['semesterEndEvaluateDate'].setValue(this.appUtilityService.setInputDate(endDateDD.getInputValue(), endDateMM.getInputValue(), endDateYY.getInputValue(), endTimeHH.getInputValue(), endTimeMM.getInputValue(), endTimeAMPM.value));

    this.submitStatus = true;
    if (this.semesterFormGroup.invalid) {
      return;
    }

    let semester: SemesterRequest = {
      semesterId: this.semesterFormGroup.controls['semesterId'].value!,
      semesterCode: this.semesterFormGroup.controls['semesterCode'].value!,
      semesterPart: this.semesterFormGroup.controls['semesterPart'].value!,
      semesterStartEvaluateDate: this.appUtilityService.fixDateOffset(this.appUtilityService.setDate(strDateDD.getInputValue(), strDateMM.getInputValue(), strDateYY.getInputValue(), strTimeHH.getInputValue(), strTimeMM.getInputValue(), strTimeAMPM.value)),
      semesterEndEvaluateDate: this.appUtilityService.fixDateOffset(this.appUtilityService.setDate(endDateDD.getInputValue(), endDateMM.getInputValue(), endDateYY.getInputValue(), endTimeHH.getInputValue(), endTimeMM.getInputValue(), endTimeAMPM.value)),
    }
    
    if (!this.semesterFormGroup.controls['semesterId'].value) {
      this.onInsertSemester(semester, strDateDD, strDateMM, strDateYY, strTimeHH, strTimeMM, strTimeAMPM, endDateDD, endDateMM, endDateYY, endTimeHH, endTimeMM, endTimeAMPM);
    } else {
      this.onUpdateSemester(semester, strDateDD, strDateMM, strDateYY, strTimeHH, strTimeMM, strTimeAMPM, endDateDD, endDateMM, endDateYY, endTimeHH, endTimeMM, endTimeAMPM);
    }
  }
  
  onInsertSemester(semester: SemesterRequest, strDateDD: InputDatetimeComponent, strDateMM: InputDatetimeComponent, strDateYY: InputDatetimeComponent, strTimeHH: InputDatetimeComponent, strTimeMM: InputDatetimeComponent, strTimeAMPM: HTMLSelectElement, endDateDD: InputDatetimeComponent, endDateMM: InputDatetimeComponent, endDateYY: InputDatetimeComponent, endTimeHH: InputDatetimeComponent, endTimeMM: InputDatetimeComponent, endTimeAMPM: HTMLSelectElement) {
    this.internCommonService.insertSemester(semester).subscribe({
      next: (res) => {
        if (this.appUtilityService.isObjectNotEmpty(res.data)) {
          this.toast.open(res.message_desc!, 'success');
          this.datatable.reRender();
        } else {
          this.toast.open(res.error_desc!, 'danger');
        }

        this.submitStatus = false;
        this.semesterFormGroup.reset();
        strDateDD.setInputValue('');
        strDateMM.setInputValue('');
        strDateYY.setInputValue('');
        strTimeHH.setInputValue('');
        strTimeMM.setInputValue('');
        strTimeAMPM.value = '';
        
        endDateDD.setInputValue('');
        endDateMM.setInputValue('');
        endDateYY.setInputValue('');
        endTimeHH.setInputValue('');
        endTimeMM.setInputValue('');
        endTimeAMPM.value = '';
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  
  onSetForm(semester: SemesterResponse, strDateDD: InputDatetimeComponent, strDateMM: InputDatetimeComponent, strDateYY: InputDatetimeComponent, strTimeHH: InputDatetimeComponent, strTimeMM: InputDatetimeComponent, strTimeAMPM: HTMLSelectElement, endDateDD: InputDatetimeComponent, endDateMM: InputDatetimeComponent, endDateYY: InputDatetimeComponent, endTimeHH: InputDatetimeComponent, endTimeMM: InputDatetimeComponent, endTimeAMPM: HTMLSelectElement) {
    this.semesterFormGroup.controls['semesterId'].setValue(semester.semesterId!);
    this.semesterFormGroup.controls['semesterCode'].setValue(semester.semesterCode!);
    this.semesterFormGroup.controls['semesterPart'].setValue(semester.semesterPart!);
    strDateDD.setInputValue(this.appUtilityService.zeroPadToNumber(new Date(semester.semesterStartEvaluateDate!).getDate(), 2));
    strDateMM.setInputValue(this.appUtilityService.zeroPadToNumber((new Date(semester.semesterStartEvaluateDate!).getMonth() + 1), 2));
    strDateYY.setInputValue(this.appUtilityService.zeroPadToNumber(new Date(semester.semesterStartEvaluateDate!).getFullYear(), 2));
    strTimeHH.setInputValue(this.appUtilityService.zeroPadToNumber((new Date(semester.semesterStartEvaluateDate!).getHours() % 12 || 12), 2));
    strTimeMM.setInputValue(this.appUtilityService.zeroPadToNumber(new Date(semester.semesterStartEvaluateDate!).getMinutes(), 2));
    strTimeAMPM.value = new Date(semester.semesterStartEvaluateDate!).getHours() < 12 ? 'AM' : 'PM';
    
    endDateDD.setInputValue(this.appUtilityService.zeroPadToNumber(new Date(semester.semesterEndEvaluateDate!).getDate(), 2));
    endDateMM.setInputValue(this.appUtilityService.zeroPadToNumber((new Date(semester.semesterEndEvaluateDate!).getMonth() + 1), 2));
    endDateYY.setInputValue(this.appUtilityService.zeroPadToNumber(new Date(semester.semesterEndEvaluateDate!).getFullYear(), 2));
    endTimeHH.setInputValue(this.appUtilityService.zeroPadToNumber((new Date(semester.semesterEndEvaluateDate!).getHours() % 12 || 12), 2));
    endTimeMM.setInputValue(this.appUtilityService.zeroPadToNumber(new Date(semester.semesterEndEvaluateDate!).getMinutes(), 2));
    endTimeAMPM.value = new Date(semester.semesterEndEvaluateDate!).getHours() < 12 ? 'AM' : 'PM';
  }

  onUpdateSemester(semester: SemesterRequest, strDateDD: InputDatetimeComponent, strDateMM: InputDatetimeComponent, strDateYY: InputDatetimeComponent, strTimeHH: InputDatetimeComponent, strTimeMM: InputDatetimeComponent, strTimeAMPM: HTMLSelectElement, endDateDD: InputDatetimeComponent, endDateMM: InputDatetimeComponent, endDateYY: InputDatetimeComponent, endTimeHH: InputDatetimeComponent, endTimeMM: InputDatetimeComponent, endTimeAMPM: HTMLSelectElement) {
    this.internCommonService.updateSemester(semester).subscribe({
      next: (res) => {
        if (this.appUtilityService.isObjectNotEmpty(res.data)) {
          this.toast.open(res.message_desc!, 'success');
          this.datatable.reRender();
        } else {
          this.toast.open(res.error_desc!, 'danger');
        }

        this.submitStatus = false;
        this.semesterFormGroup.reset();
        strDateDD.setInputValue('');
        strDateMM.setInputValue('');
        strDateYY.setInputValue('');
        strTimeHH.setInputValue('');
        strTimeMM.setInputValue('');
        strTimeAMPM.value = '';
        
        endDateDD.setInputValue('');
        endDateMM.setInputValue('');
        endDateYY.setInputValue('');
        endTimeHH.setInputValue('');
        endTimeMM.setInputValue('');
        endTimeAMPM.value = '';
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onConfirmDelete(deleteId: string) {
    this.internCommonService.deleteSemesterBySemesterId(deleteId).subscribe({
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

  semesters: SemesterRequest[] = [];
  onSetSemesterStatusList(semesterRequest: SemesterRequest) {
    if (this.semesters.some(semester => semester.semesterId === semesterRequest.semesterId)) {
      this.semesters = this.semesters.filter(semester => semester.semesterId !== semesterRequest.semesterId);
    }

    this.semesters.push(semesterRequest);
  }

  onUpdateSemesters() {
    this.internCommonService.updateSemesters(this.semesters).subscribe({
      next: (res) => {
        if (this.appUtilityService.isObjectNotEmpty(res.data)) {
          this.toast.open(res.message_desc!, 'success');
          this.datatable.reRender();
        } else {
          this.toast.open(res.error_desc!, 'danger');
        }

        this.semesters = [];
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
