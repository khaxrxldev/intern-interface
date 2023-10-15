import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AcademicSupervisorResponse } from 'src/app/model/Response/AcademicSupervisorResponse';
import { CompanyResponse } from 'src/app/model/Response/CompanyResponse';
import { IndustrySupervisorResponse } from 'src/app/model/Response/IndustrySupervisorResponse';
import { StudentResponse } from 'src/app/model/Response/StudentResponse';
import { AppUtilityService } from 'src/app/service/app-utility.service';
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
  userType!: string;

  constructor(private internUserService: InternUserService, public appUtilityService: AppUtilityService, private activatedRoute: ActivatedRoute) {
    this.userType = sessionStorage.getItem('userType')!;
  }

  ngOnInit(): void {
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
