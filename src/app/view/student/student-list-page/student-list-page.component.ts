import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastComponent } from 'src/app/share/toast/toast.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppUtilityService } from 'src/app/service/app-utility.service';
import { InternUserService } from 'src/app/service/intern-user.service';
import { InputFileType } from 'src/app/validator/input-file-type';
import { StudentRequest } from 'src/app/model/Request/StudentRequest';
import { StudentResponse } from 'src/app/model/Response/StudentResponse';
import { InternCoreService } from 'src/app/service/intern-core.service';
import { OptionContent } from 'src/app/model/OptionContent';
import { EvaluationResponse } from 'src/app/model/Response/EvaluationResponse';
import { StudentDatatableComponent } from '../student-datatable/student-datatable.component';
import { AcademicSupervisorResponse } from 'src/app/model/Response/AcademicSupervisorResponse';
import { IndustrySupervisorResponse } from 'src/app/model/Response/IndustrySupervisorResponse';
import { SemesterResponse } from 'src/app/model/Response/SemesterResponse';
import { InternCommonService } from 'src/app/service/intern-common.service';
import { EMPTY, switchMap } from 'rxjs';
import { SemesterRequest } from 'src/app/model/Request/SemesterRequest';
import { StudentSemesterResponse } from 'src/app/model/Response/StudentSemesterResponse';
import { InternUserReactiveService } from 'src/app/service/intern-user-reactive.service';

@Component({
  selector: 'app-student-list-page',
  templateUrl: './student-list-page.component.html',
  styleUrls: ['./student-list-page.component.css']
})
export class StudentListPageComponent implements OnInit {
  @ViewChild('toast') toast!: ToastComponent;
  @ViewChild('datatable') datatable!: StudentDatatableComponent;
  userType!: string;
  
  submitStatus: boolean = false;
  student: StudentResponse = {};
  academicSupervisors: AcademicSupervisorResponse[] = [];
  industrySupervisors: IndustrySupervisorResponse[] = [];

  semesters: SemesterResponse[] = [];
  campusList: string[] = [];
  courseList: string[] = [];
  classList: string[] = [];
  
  options: OptionContent[] = [];

  constructor(public appUtilityService: AppUtilityService, private internUserService: InternUserService, private internUserReactiveService: InternUserReactiveService, private internCoreService: InternCoreService, private internCommonService: InternCommonService) {
    this.userType = sessionStorage.getItem('userType')!;
  }

  ngOnInit(): void {
    this.internCoreService.retrieveEvaluations().subscribe({
      next: (res) => {
        if (this.appUtilityService.isObjectNotEmpty(res.data)) {
          let evaluations: EvaluationResponse[] = res.data.evaluations;

          let sortedEvaluations: EvaluationResponse[] = evaluations.sort(this.appUtilityService.sortArrayOfObjectByProp('evaluationName'));

          sortedEvaluations.forEach((evaluation: EvaluationResponse) => {
            let option: OptionContent = {
              value: evaluation.evaluationId!,
              text: evaluation.evaluationName!
            }

            this.options.push(option);
          });
        }
      },
      error: (err) => {
        console.log(err);
      }
    });

    this.internUserService.filterAcademicSupervisors({}).subscribe({
      next: (res) => {
        if (this.appUtilityService.isObjectNotEmpty(res.data)) {
          this.academicSupervisors = res.data.academicSupervisors;
        }
      },
      error: (err) => {
        console.log(err);
      }
    });

    this.internUserService.filterIndustrySupervisors({}).subscribe({
      next: (res) => {
        if (this.appUtilityService.isObjectNotEmpty(res.data)) {
          this.industrySupervisors = res.data.industrySupervisors;
        }
      },
      error: (err) => {
        console.log(err);
      }
    });

    this.internCommonService.retrieveSemesters().subscribe({
      next: (res) => {
        if (this.appUtilityService.isObjectNotEmpty(res.data)) {
          this.semesters = res.data.semesters.sort(this.appUtilityService.sortArrayOfObjectByProp('semesterCode'));
        }
      },
      error: (err) => {
        console.log(err);
      }
    });

    this.getFilterList();
  }

  getFilterList() {
    this.internUserService.retrieveStudents().subscribe({
      next: (res) => {
        if (this.appUtilityService.isObjectNotEmpty(res.data)) {
          let students: StudentResponse[] = res.data.students;

          if (students.length > 0) {
            students.forEach((student: StudentResponse) => {
              this.campusList.push(student.studentCampus!);
              this.courseList.push(student.studentCourse!);
              this.classList.push(student.studentClass!);
            });
          }

          this.campusList = this.campusList.filter((item, index) => this.campusList.indexOf(item) === index).sort();
          this.courseList = this.courseList.filter((item, index) => this.courseList.indexOf(item) === index).sort();
          this.classList = this.classList.filter((item, index) => this.classList.indexOf(item) === index).sort();
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  studentFormGroup: FormGroup = new FormGroup({
    studentMatricNum: new FormControl(null, [ Validators.required ]),
    studentName: new FormControl(null, [ Validators.required ]),
    studentAddress: new FormControl(null, [ Validators.required ]),
    studentEmail: new FormControl(null, [ Validators.required, Validators.email ]),
    studentPhone: new FormControl(null, [ Validators.required ]),
    studentPassword: new FormControl(null, [ Validators.required ]),
    studentCampus: new FormControl(null, [ Validators.required ]),
    studentCourse: new FormControl(null, [ Validators.required ]),
    studentClass: new FormControl(null, [ Validators.required ]),
    studentProject: new FormControl(null, []),
    studentCV: new FormControl(null, [ InputFileType.validateFileType(['pdf']) ]),
    studentMiniTranscript: new FormControl(null, [ InputFileType.validateFileType(['pdf']) ]),
    studentCoverLetter: new FormControl(null, [ InputFileType.validateFileType(['pdf']) ]),
    studentCourseOutline: new FormControl(null, [ InputFileType.validateFileType(['pdf']) ]),
    studentSL: new FormControl(null, [ InputFileType.validateFileType(['pdf']) ]),
    industrySvId: new FormControl(null, []),
    academicSvId: new FormControl(null, []),
    coordinatorId: new FormControl(null, []),
    part6Semester: new FormControl('', [ Validators.required ]),
    part7Semester: new FormControl('', [ Validators.required ])
  });

  onSubmitForm(cvInputFile: HTMLInputElement, mtInputFile: HTMLInputElement, clInputFile: HTMLInputElement, coInputFile: HTMLInputElement, slInputFile: HTMLInputElement) {
    this.submitStatus = true;
    if (this.studentFormGroup.invalid) {
      return;
    }

    let student: StudentRequest = {
      studentMatricNum: this.studentFormGroup.controls['studentMatricNum'].value,
      studentName: this.studentFormGroup.controls['studentName'].value,
      studentAddress: this.studentFormGroup.controls['studentAddress'].value,
      studentEmail: this.studentFormGroup.controls['studentEmail'].value,
      studentPhone: this.studentFormGroup.controls['studentPhone'].value,
      studentPassword: this.studentFormGroup.controls['studentPassword'].value,
      studentCampus: this.studentFormGroup.controls['studentCampus'].value,
      studentCourse: this.studentFormGroup.controls['studentCourse'].value,
      studentClass: this.studentFormGroup.controls['studentClass'].value,
      studentProject: this.studentFormGroup.controls['studentProject'].value,
      industrySvId: this.studentFormGroup.controls['industrySvId'].value,
      academicSvId: this.studentFormGroup.controls['academicSvId'].value,
      coordinatorId: this.studentFormGroup.controls['coordinatorId'].value
    }

    let cvFile: File = cvInputFile.files ? cvInputFile.files![0]: new File([], '');
    let mtFile: File = mtInputFile.files ? mtInputFile.files![0]: new File([], '');
    let clFile: File = clInputFile.files ? clInputFile.files![0]: new File([], '');
    let coFile: File = coInputFile.files ? coInputFile.files![0]: new File([], '');
    let slFile: File = slInputFile.files ? slInputFile.files![0]: new File([], '');

    this.internUserService.insertStudent(student, cvFile, mtFile, clFile, coFile, slFile).pipe(
      switchMap((res) => {
        let semesterIds: string[] = [
          this.studentFormGroup.controls['part6Semester'].value,
          this.studentFormGroup.controls['part7Semester'].value
        ];

        if (this.appUtilityService.isObjectNotEmpty(res.data)) {
          return this.internCommonService.insertStudentSemesters(semesterIds, res.data.student.studentMatricNum)
        } else {
          return EMPTY;
        }
      }),
      switchMap((res) => {
        if (this.appUtilityService.isObjectNotEmpty(res.data)) {
          let semesters: SemesterRequest[] = [];

          res.data.studentSemesters.forEach((studentSemester: StudentSemesterResponse) => {
            let semester: SemesterRequest = {
              semesterId: studentSemester?.semester?.semesterId,
              semesterCode: studentSemester?.semester?.semesterCode,
              semesterPart: studentSemester?.semester?.semesterPart,
              semesterStatus: studentSemester?.semester?.semesterStatus,
              semesterStartDate: studentSemester?.semester?.semesterStartDate,
              semesterEndDate: studentSemester?.semester?.semesterEndDate,
              semesterStartEvaluateDate: studentSemester?.semester?.semesterStartEvaluateDate,
              semesterEndEvaluateDate: studentSemester?.semester?.semesterEndEvaluateDate
            }

            semesters.push(semester);
          });

          return this.internCoreService.insertStudentEvaluations(semesters, this.studentFormGroup.controls['studentMatricNum'].value);
        } else {
          return EMPTY;
        }
      })
    ).subscribe({
      next: (res) => {
        if (this.appUtilityService.isObjectNotEmpty(res.data)) {
          this.toast.open(res.message_desc!, 'success');
          this.datatable.reRender();
        } else {
          this.toast.open(res.error_desc!, 'danger');
        }
        
        this.student = {};
        this.getFilterList();
        this.submitStatus = false;
        this.studentFormGroup.reset();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onSetForm(student: StudentResponse) {
    this.studentFormGroup.controls['studentMatricNum'].setValue(student.studentMatricNum);
    this.studentFormGroup.controls['studentName'].setValue(student.studentName);
    this.studentFormGroup.controls['studentAddress'].setValue(student.studentAddress);
    this.studentFormGroup.controls['studentEmail'].setValue(student.studentEmail);
    this.studentFormGroup.controls['studentPhone'].setValue(student.studentPhone);
    this.studentFormGroup.controls['studentPassword'].setValue(student.studentPassword);
    this.studentFormGroup.controls['studentCampus'].setValue(student.studentCampus);
    this.studentFormGroup.controls['studentCourse'].setValue(student.studentCourse);
    this.studentFormGroup.controls['studentClass'].setValue(student.studentClass);
    this.studentFormGroup.controls['studentProject'].setValue(student.studentProject);
    this.studentFormGroup.controls['industrySvId'].setValue(student.industrySvId);
    this.studentFormGroup.controls['academicSvId'].setValue(student.academicSvId);
    this.studentFormGroup.controls['coordinatorId'].setValue(student.coordinatorId);

    if (student.studentSemesters?.length) {
      student.studentSemesters.forEach((studentSemester: StudentSemesterResponse) => {
        switch (studentSemester.semester?.semesterPart) {
          case 'PART_6':
            this.studentFormGroup.controls['part6Semester'].setValue(studentSemester.semesterId);
            break;
          case 'PART_7':
            this.studentFormGroup.controls['part7Semester'].setValue(studentSemester.semesterId);
            break;
        }
      })
    }
  }

  students: StudentRequest[] = [];
  onSetStudentStatusList(studentRequest: StudentRequest) {
    if (this.students.some(student => student.studentMatricNum === studentRequest.studentMatricNum)) {
      this.students = this.students.filter(student => student.studentMatricNum !== studentRequest.studentMatricNum);
    }

    this.students.push(studentRequest);
  }

  onUpdateStudents() {
    this.internUserService.updateStudents(this.students).subscribe({
      next: (res) => {
        if (this.appUtilityService.isObjectNotEmpty(res.data)) {
          this.toast.open(res.message_desc!, 'success');
          this.datatable.reRender();
        } else {
          this.toast.open(res.error_desc!, 'danger');
        }

        this.students = [];
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
