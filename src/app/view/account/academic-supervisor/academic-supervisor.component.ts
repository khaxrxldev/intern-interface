import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AcademicSupervisorRequest } from 'src/app/model/Request/AcademicSupervisorRequest';
import { AppUtilityService } from 'src/app/service/app-utility.service';
import { ToastComponent } from 'src/app/share/toast/toast.component';
import { Observable, map } from 'rxjs';
import { AcademicSupervisorResponse } from 'src/app/model/Response/AcademicSupervisorResponse';
import { InternUserReactiveService } from 'src/app/service/intern-user-reactive.service';

@Component({
  selector: 'app-academic-supervisor',
  templateUrl: './academic-supervisor.component.html',
  styleUrls: ['./academic-supervisor.component.css']
})
export class AcademicSupervisorComponent implements OnInit {
  @ViewChild('toast') toast!: ToastComponent;
  
  constructor(private internUserReactiveService: InternUserReactiveService, public appUtilityService: AppUtilityService) {}
  
  academicSV$!: Observable<AcademicSupervisorResponse>;

  academicSvFormGroup: FormGroup = new FormGroup({
    supervisorId: new FormControl(null, []),
    supervisorName: new FormControl(null, [ Validators.required ]),
    supervisorPhone: new FormControl(null, [ Validators.required ]),
    supervisorEmail: new FormControl(null, [ Validators.required, Validators.email ]),
    supervisorPassword: new FormControl(null, [ Validators.required ]),
    supervisorGender: new FormControl(null, [ Validators.required ]),
    supervisorPosition: new FormControl(null, []),
    supervisorCoordinator: new FormControl(null, [ Validators.required ])
  });

  ngOnInit(): void {
    this.getAcademicSV();
  }

  getAcademicSV() {
    this.academicSV$ = this.internUserReactiveService.getAcademicSv(sessionStorage.getItem('userId')!).pipe(
      map((res) => {
        this.academicSvFormGroup.controls['supervisorId'].setValue(res.academicSvId);
        this.academicSvFormGroup.controls['supervisorName'].setValue(res.academicSvName);
        this.academicSvFormGroup.controls['supervisorPhone'].setValue(res.academicSvPhone);
        this.academicSvFormGroup.controls['supervisorEmail'].setValue(res.academicSvEmail);
        this.academicSvFormGroup.controls['supervisorPassword'].setValue(res.academicSvPassword);
        this.academicSvFormGroup.controls['supervisorGender'].setValue(res.academicSvGender);
        this.academicSvFormGroup.controls['supervisorPosition'].setValue(res.academicSvPosition);
        this.academicSvFormGroup.controls['supervisorCoordinator'].setValue(res.academicSvCoordinator);

        return res;
      })
    );
  }

  onSubmitForm() {
    if (this.academicSvFormGroup.invalid) {
      return;
    }

    let academicSupervisor: AcademicSupervisorRequest = {
      academicSvId: this.academicSvFormGroup.controls['supervisorId'].value,
      academicSvName: this.academicSvFormGroup.controls['supervisorName'].value,
      academicSvPhone: this.academicSvFormGroup.controls['supervisorPhone'].value,
      academicSvEmail: this.academicSvFormGroup.controls['supervisorEmail'].value,
      academicSvPassword: this.academicSvFormGroup.controls['supervisorPassword'].value,
      academicSvGender: this.academicSvFormGroup.controls['supervisorGender'].value,
      academicSvPosition: this.academicSvFormGroup.controls['supervisorPosition'].value,
      academicSvCoordinator: this.academicSvFormGroup.controls['supervisorCoordinator'].value
    }

    this.internUserReactiveService.updateAcademicSv(academicSupervisor).subscribe({
      next: (res) => {
        if (this.appUtilityService.isObjectNotEmpty(res)) {
          this.getAcademicSV();
          this.toast.open('SUCCESS', 'success');
        } else {
          this.toast.open('FAIL', 'danger');
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
