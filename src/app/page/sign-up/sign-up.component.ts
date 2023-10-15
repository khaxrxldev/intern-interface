import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IndustrySupervisorRequest } from 'src/app/model/Request/IndustrySupervisorRequest';
import { StudentRequest } from 'src/app/model/Request/StudentRequest';
import { CompanyResponse } from 'src/app/model/Response/CompanyResponse';
import { StudentResponse } from 'src/app/model/Response/StudentResponse';
import { AppUtilityService } from 'src/app/service/app-utility.service';
import { InternCommonService } from 'src/app/service/intern-common.service';
import { InternUserService } from 'src/app/service/intern-user.service';
import { AlertComponent } from 'src/app/share/alert/alert.component';
import { InputFileType } from 'src/app/validator/input-file-type';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  @ViewChild('industryAlert') industryAlert!: AlertComponent;
  @ViewChild('studentAlert') studentAlert!: AlertComponent;

  active: number = 1;
  submitIndustryStatus: boolean = false;
  submitStudentStatus: boolean = false;
  student: StudentResponse = {};
  companies: CompanyResponse[] = [];
  
  constructor(public appUtilityService: AppUtilityService, private internUserService: InternUserService, private internCommonService: InternCommonService) {}

  ngOnInit(): void {
    this.internCommonService.retrieveCompanies().subscribe({
      next: (res) => {
        if (this.appUtilityService.isObjectNotEmpty(res.data)) {
          this.companies = res.data.companies;
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  industrySvFormGroup: FormGroup = new FormGroup({
    supervisorId: new FormControl(null, []),
    supervisorName: new FormControl(null, [ Validators.required ]),
    supervisorPhone: new FormControl(null, [ Validators.required ]),
    supervisorEmail: new FormControl(null, [ Validators.required, Validators.email ]),
    supervisorPassword: new FormControl(null, [ Validators.required ]),
    supervisorGender: new FormControl(null, [ Validators.required ]),
    supervisorPosition: new FormControl(null, []),
    companyId: new FormControl(null, []),
  });

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
    studentCV: new FormControl(null, [ InputFileType.validateFileType(['pdf']) ]),
    studentMiniTranscript: new FormControl(null, [ InputFileType.validateFileType(['pdf']) ]),
    studentCoverLetter: new FormControl(null, [ InputFileType.validateFileType(['pdf']) ]),
    studentCourseOutline: new FormControl(null, [ InputFileType.validateFileType(['pdf']) ]),
    studentSL: new FormControl(null, [ InputFileType.validateFileType(['pdf']) ])
  });
  
  onSubmitIndustryForm() {
    this.submitIndustryStatus = true;
    if (this.industrySvFormGroup.invalid) {
      return;
    }

    let industrySupervisor: IndustrySupervisorRequest = {
      industrySvId: this.industrySvFormGroup.controls['supervisorId'].value,
      industrySvName: this.industrySvFormGroup.controls['supervisorName'].value,
      industrySvPhone: this.industrySvFormGroup.controls['supervisorPhone'].value,
      industrySvEmail: this.industrySvFormGroup.controls['supervisorEmail'].value,
      industrySvPassword: this.industrySvFormGroup.controls['supervisorPassword'].value,
      industrySvGender: this.industrySvFormGroup.controls['supervisorGender'].value,
      industrySvPosition: this.industrySvFormGroup.controls['supervisorPosition'].value,
      companyId: this.industrySvFormGroup.controls['companyId'].value
    }

    this.internUserService.insertIndustrySupervisor(industrySupervisor).subscribe({
      next: (res) => {
        if (this.appUtilityService.isObjectNotEmpty(res.data)) {
          this.industryAlert.open(true, 'success', 'SUCCESS');
        } else {
          this.industryAlert.open(true, 'danger', 'FAIL');
        }

        this.submitIndustryStatus = false;
        this.industrySvFormGroup.reset();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onSubmitStudentForm(cvInputFile: HTMLInputElement, mtInputFile: HTMLInputElement, clInputFile: HTMLInputElement, coInputFile: HTMLInputElement, slInputFile: HTMLInputElement) {
    this.submitStudentStatus = true;
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
      studentClass: this.studentFormGroup.controls['studentClass'].value
    }

    let cvFile: File = cvInputFile.files ? cvInputFile.files![0]: new File([], '');
    let mtFile: File = mtInputFile.files ? mtInputFile.files![0]: new File([], '');
    let clFile: File = clInputFile.files ? clInputFile.files![0]: new File([], '');
    let coFile: File = coInputFile.files ? coInputFile.files![0]: new File([], '');
    let slFile: File = slInputFile.files ? slInputFile.files![0]: new File([], '');

    this.internUserService.insertStudent(student, cvFile, mtFile, clFile, coFile, slFile).subscribe({
      next: (res) => {
        if (this.appUtilityService.isObjectNotEmpty(res.data)) {
          this.studentAlert.open(true, 'success', 'SUCCESS');
        } else {
          this.studentAlert.open(true, 'danger', 'FAIL');
        }

        this.student = {};
        this.submitStudentStatus = false;
        this.studentFormGroup.reset();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
