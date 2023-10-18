import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AcademicSupervisorResponse } from 'src/app/model/Response/AcademicSupervisorResponse';
import { CompanyResponse } from 'src/app/model/Response/CompanyResponse';
import { IndustrySupervisorResponse } from 'src/app/model/Response/IndustrySupervisorResponse';
import { SemesterResponse } from 'src/app/model/Response/SemesterResponse';
import { StudentResponse } from 'src/app/model/Response/StudentResponse';
import { AppUtilityService } from 'src/app/service/app-utility.service';
import { InternCommonService } from 'src/app/service/intern-common.service';
import { InternUserService } from 'src/app/service/intern-user.service';
import { ModalComponent } from 'src/app/share/modal/modal.component';

@Component({
  selector: 'app-student-view-page',
  templateUrl: './student-view-page.component.html',
  styleUrls: ['./student-view-page.component.css']
})
export class StudentViewPageComponent implements OnInit {
  @ViewChild('modal') modal!: ModalComponent;

  company!: CompanyResponse;
  student!: StudentResponse;
  academicSupervisors: AcademicSupervisorResponse[] = [];
  industrySupervisors: IndustrySupervisorResponse[] = [];
  semesters: SemesterResponse[] = [];
  userType!: string;

  constructor(private internUserService: InternUserService, private internCommonService: InternCommonService, public appUtilityService: AppUtilityService, private activatedRoute: ActivatedRoute) {
    this.userType = sessionStorage.getItem('userType')!;
  }

  ngOnInit(): void {
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

    this.internUserService.filterAcademicSupervisors({}).subscribe({
      next: (res) => {
        if (this.appUtilityService.isObjectNotEmpty(res.data)) {
          this.academicSupervisors = res.data.academicSupervisors
        }
      },
      error: (err) => {
        console.log(err);
      }
    });

    this.internUserService.filterIndustrySupervisors({}).subscribe({
      next: (res) => {
        if (this.appUtilityService.isObjectNotEmpty(res.data)) {
          this.industrySupervisors = res.data.industrySupervisors
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
    
    this.internUserService.retrieveStudentByStudentMatricNum(this.activatedRoute.snapshot.paramMap.get("studentId")!).subscribe({
      next: (res) => {
        this.student = res.data.student;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onOpenModal(data: any) {
    console.log(data)
    this.modal.open(this.modal.childContent);
  }
}
