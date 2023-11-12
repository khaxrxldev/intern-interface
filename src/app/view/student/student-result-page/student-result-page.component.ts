import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StudentEvaluationRequest } from 'src/app/model/Request/StudentEvaluationRequest';
import { StudentResponse } from 'src/app/model/Response/StudentResponse';
import { AppUtilityService } from 'src/app/service/app-utility.service';
import { InternCoreService } from 'src/app/service/intern-core.service';
import { InternUserService } from 'src/app/service/intern-user.service';
import { InputDatetimeComponent } from 'src/app/share/input-datetime/input-datetime.component';
import { ModalComponent } from 'src/app/share/modal/modal.component';
import { ToastComponent } from 'src/app/share/toast/toast.component';
import { InputDateTime } from 'src/app/validator/input-date-time';
import { StudentEvaluationDatatableComponent } from '../student-evaluation-datatable/student-evaluation-datatable.component';
import { EvaluationResponse } from 'src/app/model/Response/EvaluationResponse';
import { EvaluationCriteriasResponse } from 'src/app/model/Response/EvaluationCriteriasResponse';
import { ResultRequest } from 'src/app/model/Request/ResultRequest';
import { CriteriaQuestionsResponse } from 'src/app/model/Response/CriteriaQuestionsResponse';
import { QuestionResponse } from 'src/app/model/Response/QuestionResponse';
import { StudentEvaluationResponse } from 'src/app/model/Response/StudentEvaluationResponse';
import { EvaluationRequest } from 'src/app/model/Request/EvaluationRequest';

@Component({
  selector: 'app-student-result-page',
  templateUrl: './student-result-page.component.html',
  styleUrls: ['./student-result-page.component.css']
})
export class StudentResultPageComponent implements OnInit {
  @ViewChild('evaluationModal') evaluationModal!: ModalComponent;
  @ViewChild('toast') toast!: ToastComponent;
  @ViewChild('datatable') datatable!: StudentEvaluationDatatableComponent;

  submitStatus: boolean = false;
  disableSubmitEvaluationbtn: boolean = true;
  student!: StudentResponse;
  evaluation!: EvaluationCriteriasResponse;
  evaluations: EvaluationResponse[] = [];
  studentEvaluation: StudentEvaluationResponse = {};
  
  userType!: string;
  constructor(private internUserService: InternUserService, private internCoreService: InternCoreService, public appUtilityService: AppUtilityService, private activatedRoute: ActivatedRoute) {
    this.userType = sessionStorage.getItem('userType')!;
  }

  ngOnInit(): void {
    this.internUserService.retrieveStudentByStudentMatricNum(this.activatedRoute.snapshot.paramMap.get("studentId")!).subscribe({
      next: (res) => {
        this.student = res.data.student;
      },
      error: (err) => {
        console.log(err);
      }
    });

    // this.getEvaluationList();
  }

  getEvaluationList() {
    let evaluation: EvaluationRequest = {
      studentMatricNum: this.activatedRoute.snapshot.paramMap.get("studentId")!
    }
    this.internCoreService.filterEvaluations(evaluation).subscribe({
      next: (res) => {
        if (this.appUtilityService.isObjectNotEmpty(res.data)) {
          this.evaluations = res.data.evaluations.sort(this.appUtilityService.sortArrayOfObjectByProp('evaluationName'));
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  studentEvaluationFormGroup: FormGroup = new FormGroup({
    studentEvaluationId: new FormControl(null, []),
    studentEvaluationStartDt: new FormControl(null, [ InputDateTime.validateDateTime() ]),
    studentEvaluationEndDt: new FormControl(null, [ InputDateTime.validateDateTime() ]),
    evaluationId: new FormControl(null, [ Validators.required ])
  });

  onSubmitForm(strDateDD: InputDatetimeComponent, strDateMM: InputDatetimeComponent, strDateYY: InputDatetimeComponent, strTimeHH: InputDatetimeComponent, strTimeMM: InputDatetimeComponent, strTimeAMPM: HTMLSelectElement, endDateDD: InputDatetimeComponent, endDateMM: InputDatetimeComponent, endDateYY: InputDatetimeComponent, endTimeHH: InputDatetimeComponent, endTimeMM: InputDatetimeComponent, endTimeAMPM: HTMLSelectElement) {
    this.studentEvaluationFormGroup.controls['studentEvaluationStartDt'].setValue(this.appUtilityService.setInputDate(strDateDD.getInputValue(), strDateMM.getInputValue(), strDateYY.getInputValue(), strTimeHH.getInputValue(), strTimeMM.getInputValue(), strTimeAMPM.value));
    this.studentEvaluationFormGroup.controls['studentEvaluationEndDt'].setValue(this.appUtilityService.setInputDate(endDateDD.getInputValue(), endDateMM.getInputValue(), endDateYY.getInputValue(), endTimeHH.getInputValue(), endTimeMM.getInputValue(), endTimeAMPM.value));

    this.submitStatus = true;
    if (this.studentEvaluationFormGroup.invalid) {
      return;
    }

    let evaluation: StudentEvaluationRequest = {
      studentEvaluationId: this.studentEvaluationFormGroup.value.evaluationId,
      studentEvaluationStatus: 'INC',
      studentEvaluationStartDate: this.appUtilityService.fixDateOffset(this.appUtilityService.setDate(strDateDD.getInputValue(), strDateMM.getInputValue(), strDateYY.getInputValue(), strTimeHH.getInputValue(), strTimeMM.getInputValue(), strTimeAMPM.value)),
      studentEvaluationEndDate: this.appUtilityService.fixDateOffset(this.appUtilityService.setDate(endDateDD.getInputValue(), endDateMM.getInputValue(), endDateYY.getInputValue(), endTimeHH.getInputValue(), endTimeMM.getInputValue(), endTimeAMPM.value)),
      evaluationId: this.studentEvaluationFormGroup.controls['evaluationId'].value,
      studentMatricNum: this.activatedRoute.snapshot.paramMap.get("studentId")!
    }
    
    if (!this.studentEvaluationFormGroup.controls['studentEvaluationId'].value) {
      this.onInsertEvaluation(evaluation, strDateDD, strDateMM, strDateYY, strTimeHH, strTimeMM, strTimeAMPM, endDateDD, endDateMM, endDateYY, endTimeHH, endTimeMM, endTimeAMPM);
    }
  }

  onInsertEvaluation(studentEvaluation: StudentEvaluationRequest, strDateDD: InputDatetimeComponent, strDateMM: InputDatetimeComponent, strDateYY: InputDatetimeComponent, strTimeHH: InputDatetimeComponent, strTimeMM: InputDatetimeComponent, strTimeAMPM: HTMLSelectElement, endDateDD: InputDatetimeComponent, endDateMM: InputDatetimeComponent, endDateYY: InputDatetimeComponent, endTimeHH: InputDatetimeComponent, endTimeMM: InputDatetimeComponent, endTimeAMPM: HTMLSelectElement) {
    this.internCoreService.insertStudentEvaluation(studentEvaluation, new File([], '')).subscribe({
      next: (res) => {
        if (this.appUtilityService.isObjectNotEmpty(res.data)) {
          this.toast.open(res.message_desc!, 'success');
          this.datatable.reRender();
        } else {
          this.toast.open(res.error_desc!, 'danger');
        }

        this.submitStatus = false;
        this.studentEvaluationFormGroup.reset();
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
        this.evaluationModal.close();
        this.getEvaluationList();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onConfirmDelete(deleteId: string) {
    this.internCoreService.deleteStudentEvaluation(deleteId).subscribe({
      next: (res) => {
        if (res.message_status) {
          this.toast.open(res.message_desc!, 'success');
          this.datatable.reRender();
        } else {
          this.toast.open(res.error_desc!, 'danger');
        }
        this.getEvaluationList();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onGetCompleteEvaluation(evaluationId: string, studentEvaluationId: string) {
    this.internCoreService.retrieveCompleteEvaluation(evaluationId, studentEvaluationId).subscribe({
      next: (res) => {
        if (this.appUtilityService.isObjectNotEmpty(res.data)) {
          this.evaluation = res.data.evaluation
          if (this.evaluation.criterias?.length! > 0) {
            let criteriaPercentageTotal = 0;
            this.evaluation.criterias?.forEach((criteria: CriteriaQuestionsResponse) => {
              criteriaPercentageTotal += criteria.criteria?.criteriaPercentage!;
              if (criteria.questions?.length! > 0) {
                let criteriaTotalMark = 0;
                criteria.questions?.forEach((question: QuestionResponse) => {
                  if (question.questionResult) {
                    criteriaTotalMark = criteriaTotalMark + question.questionResult?.resultTotalMark!;
                  }
                });
                criteria.criteriaMark = (criteriaTotalMark * ((criteria.criteria?.criteriaPercentage!) / 100));
              }
            });
            let tdTotalCriteriaPercentage = document.getElementById('total_criteria_percentage') as HTMLTableCellElement;
            tdTotalCriteriaPercentage.innerHTML = `SUPERVISOR (${criteriaPercentageTotal}%)`;
          }
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  setTotalMark(modalBody: HTMLDivElement, weightage: number, event: any, totalMarkInputId: string, criteriaId: number, totalCriteriaInputId: string) {
    let score = event.target.value;
    let totalAllTotalMark: number = 0;
    let totalAllCriteria = 0;

    let totalMarkInput = document.getElementById(totalMarkInputId) as HTMLInputElement;
    totalMarkInput.value = (+score * weightage).toString();

    let inputs = modalBody.getElementsByTagName('input') as HTMLCollectionOf<HTMLInputElement>;
    let selects = modalBody.getElementsByTagName('select') as HTMLCollectionOf<HTMLSelectElement>;

    this.disableSubmitEvaluationbtn = false;
    Array.from(selects).forEach((select: HTMLSelectElement) => {
      if (!select.value) {
        this.disableSubmitEvaluationbtn = true;
      }
    });

    Array.from(inputs).forEach((input: HTMLInputElement) => {
      if (input.id) {
        let inputId: string = input.id;
        let iciqID = inputId.replace('input_total_mark_', '');
        let inputCriteriaId = +(iciqID.substring(0, iciqID.lastIndexOf('_')));

        if(inputCriteriaId === criteriaId) {
          totalAllTotalMark = totalAllTotalMark + +(input.value);
        }
      }
    });
  
    let criteriaPercentInput = document.getElementById('input_criteria_percent' + criteriaId) as HTMLInputElement;
    let totalCriteriaInput = document.getElementById(totalCriteriaInputId) as HTMLInputElement;
    totalCriteriaInput.value = (totalAllTotalMark * ((+criteriaPercentInput.value) / 100)).toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
    
    Array.from(inputs).forEach((input: HTMLInputElement) => {
      if (input.id) {
        if (input.id.includes('input_total_criteria_')) {
          totalAllCriteria = totalAllCriteria + +(input.value);
        }
      }
    });

    let totalAllCriteriaInput = document.getElementById('input_total_all_criteria') as HTMLInputElement;
    totalAllCriteriaInput.value = (totalAllCriteria).toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
  }

  onSubmitEvaluation(modalBody: HTMLDivElement, studentEvaluationId: string) {
    let inputs = modalBody.getElementsByTagName('input') as HTMLCollectionOf<HTMLInputElement>;
    let results: ResultRequest[] = [];

    Array.from(inputs).forEach((input: HTMLInputElement) => {
      if (input.id) {
        if (input.id.includes('question_id_')) {
          let iciqID = input.id.includes('question_id_') ? input.id.replace('question_id_', ''): '';

          let scoreSelect = document.getElementById('select_score_' + iciqID) as HTMLInputElement;
          let totalMarkInput = document.getElementById('input_total_mark_' + iciqID) as HTMLInputElement;

          let result: ResultRequest = {
            resultScore: +scoreSelect.value,
            resultTotalMark: +totalMarkInput.value,
            questionId: input.value,
            studentEvaluationId: studentEvaluationId
          }
          results.push(result);
        }
      }
    });

    let commentCriteriaTextarea = document.getElementById('textarea_comment_criteria') as HTMLTextAreaElement;
    let totalAllCriteriaInput = document.getElementById('input_total_all_criteria') as HTMLInputElement;

    let studentEvaluationRequest: StudentEvaluationRequest = {
      studentEvaluationId: this.studentEvaluation.studentEvaluationId,
      studentEvaluationDate: this.appUtilityService.fixDateOffset((new Date()).toString()),
      studentEvaluationStatus: 'CMP',
      studentEvaluationComment: commentCriteriaTextarea.value,
      studentEvaluationTotalScore: +(totalAllCriteriaInput.value),
      academicSvId: this.student.academicSvId,
      industrySvId: this.student.industrySvId
    }

    this.internCoreService.insertResults(results).subscribe({
      next: (res) => {
        console.log(res)
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.internCoreService.updateStudentEvaluation(studentEvaluationRequest, new File([], '')).subscribe({
          next: (res) => {
            if (this.appUtilityService.isObjectNotEmpty(res.data)) {
              this.toast.open(res.message_desc!, 'success');
              this.datatable.reRender();
            } else {
              this.toast.open(res.error_desc!, 'danger');
            }
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
    });
  }

  /**
   * ! Print rendered HTML element function
  printDiv(modalBody: HTMLDivElement, documentName: string) {
    let htmlDoc = '<html>';
    htmlDoc += '<link rel="stylesheet" type="text/css" href="../../../../styles.css"/>';
    htmlDoc += '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap">';
    htmlDoc += '<body id="print">';
    htmlDoc += modalBody.innerHTML;
    htmlDoc += '</body>';
    htmlDoc += '</html>';

    let newWindow = window.open('', documentName, 'left=0, top=0, width=800, height=900, toolbar=0, scrollbars=0, status=0');
    newWindow?.document.open();
    newWindow?.document.write(htmlDoc);
    newWindow?.document.close();
    newWindow?.focus();

    setTimeout(() => { 
      newWindow?.print();
      newWindow?.close();
    }, 1000);
  }
  */

  printResult(studentMatricNum: string, evaluationId: string, studentEvaluationId: string) {
    this.internCoreService.printStudentResult(studentMatricNum, evaluationId, studentEvaluationId).subscribe({
      next: (res) => {
        this.appUtilityService.onOpenPDFNewWindow(URL.createObjectURL(res.body!));
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
