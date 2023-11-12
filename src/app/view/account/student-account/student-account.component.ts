import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EMPTY, Observable, map, of, switchMap, tap } from 'rxjs';
import { StudentRequest } from 'src/app/model/Request/StudentRequest';
import { AcademicSupervisorResponse } from 'src/app/model/Response/AcademicSupervisorResponse';
import { IndustrySupervisorResponse } from 'src/app/model/Response/IndustrySupervisorResponse';
import { StudentResponse } from 'src/app/model/Response/StudentResponse';
import { AppUtilityService } from 'src/app/service/app-utility.service';
import { InternUserReactiveService } from 'src/app/service/intern-user-reactive.service';
import { ToastComponent } from 'src/app/share/toast/toast.component';
import { InputFileType } from 'src/app/validator/input-file-type';

@Component({
  selector: 'app-student-account',
  templateUrl: './student-account.component.html',
  styleUrls: ['./student-account.component.css']
})
export class StudentAccountComponent implements OnInit {
  @ViewChild('toast') toast!: ToastComponent;

  constructor(public appUtilityService: AppUtilityService, private internUserReactiveService: InternUserReactiveService) {}
  
  student$!: Observable<StudentResponse>;
  academicSVs$!: Observable<AcademicSupervisorResponse[]>;
  industrySVs$!: Observable<IndustrySupervisorResponse[]>;
  academicSV$!: Observable<AcademicSupervisorResponse>;
  industrySV$!: Observable<IndustrySupervisorResponse>;

  campusList$!: Observable<string[]>;
  courseList$!: Observable<string[]>;
  classList$!: Observable<string[]>;

  studentFormGroup: FormGroup = new FormGroup({
    studentMatricNum: new FormControl({value: null, disabled: true}, [ Validators.required ]),
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
  });
  
  ngOnInit(): void {
    this.getStudent();
    this.getSupervisors();
    this.academicSVs$ = this.internUserReactiveService.getAcademicSVs({});
    this.industrySVs$ = this.internUserReactiveService.getIndustrySVs({});
  }

  getSupervisors() {
    this.academicSV$ = this.internUserReactiveService.getStudent(sessionStorage.getItem('userId')!).pipe(
      switchMap(res => res ? this.getAcademicSV$(res.academicSvId!) : EMPTY)
    );

    this.industrySV$ = this.internUserReactiveService.getStudent(sessionStorage.getItem('userId')!).pipe(
      switchMap(res => res ? this.getIndustrySV$(res.industrySvId!) : EMPTY)
    );

    this.campusList$ = this.internUserReactiveService.getStudents().pipe(
      map(res => res.map(a => a.studentCampus!)),
      switchMap(res => of(res.filter((item, index) => res.indexOf(item) === index).sort()))
    )

    this.courseList$ = this.internUserReactiveService.getStudents().pipe(
      map(res => res.map(a => a.studentCourse!)),
      switchMap(res => of(res.filter((item, index) => res.indexOf(item) === index).sort()))
    )

    this.classList$ = this.internUserReactiveService.getStudents().pipe(
      map(res => res.map(a => a.studentClass!)),
      switchMap(res => of(res.filter((item, index) => res.indexOf(item) === index).sort()))
    )
  }

  getAcademicSV$(academicSvId: string): Observable<AcademicSupervisorResponse> {
    return this.internUserReactiveService.getAcademicSv(academicSvId);
  }

  getIndustrySV$(industrySvId: string): Observable<IndustrySupervisorResponse> {
    return this.internUserReactiveService.getIndustrySv(industrySvId);
  }

  getStudent() {
    this.student$ = this.internUserReactiveService.getStudent(sessionStorage.getItem('userId')!).pipe(
      map((res) => {
        if (res) {
          this.studentFormGroup.controls['studentMatricNum'].setValue(res.studentMatricNum);
          this.studentFormGroup.controls['studentName'].setValue(res.studentName);
          this.studentFormGroup.controls['studentAddress'].setValue(res.studentAddress);
          this.studentFormGroup.controls['studentEmail'].setValue(res.studentEmail);
          this.studentFormGroup.controls['studentPhone'].setValue(res.studentPhone);
          this.studentFormGroup.controls['studentPassword'].setValue(res.studentPassword);
          this.studentFormGroup.controls['studentCampus'].setValue(res.studentCampus);
          this.studentFormGroup.controls['studentCourse'].setValue(res.studentCourse);
          this.studentFormGroup.controls['studentClass'].setValue(res.studentClass);
          this.studentFormGroup.controls['studentProject'].setValue(res.studentProject);
          this.studentFormGroup.controls['industrySvId'].setValue(res.industrySvId);
          this.studentFormGroup.controls['academicSvId'].setValue(res.academicSvId);
        }

        return res;
      })
    );
  }

  updateStudent(cvInputFile: HTMLInputElement, mtInputFile: HTMLInputElement, clInputFile: HTMLInputElement, coInputFile: HTMLInputElement, slInputFile: HTMLInputElement) {
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
    }

    let cvFile: File = cvInputFile.files ? cvInputFile.files![0]: new File([], '');
    let mtFile: File = mtInputFile.files ? mtInputFile.files![0]: new File([], '');
    let clFile: File = clInputFile.files ? clInputFile.files![0]: new File([], '');
    let coFile: File = coInputFile.files ? coInputFile.files![0]: new File([], '');
    let slFile: File = slInputFile.files ? slInputFile.files![0]: new File([], '');

    this.internUserReactiveService.updateStudent(student, cvFile, mtFile, clFile, coFile, slFile).pipe(
      tap((res) => {
        if (this.appUtilityService.isObjectNotEmpty(res)) {
          this.getStudent();
          this.getSupervisors();
          this.toast.open('SUCCESS', 'success');
        } else {
          this.toast.open('FAIL', 'danger');
        }
      })
    ).subscribe();
  }
}
