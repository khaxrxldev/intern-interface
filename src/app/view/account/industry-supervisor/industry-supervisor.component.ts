import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { IndustrySupervisorRequest } from 'src/app/model/Request/IndustrySupervisorRequest';
import { CompanyResponse } from 'src/app/model/Response/CompanyResponse';
import { IndustrySupervisorResponse } from 'src/app/model/Response/IndustrySupervisorResponse';
import { AppUtilityService } from 'src/app/service/app-utility.service';
import { InternCommonReactiveService } from 'src/app/service/intern-common-reactive.service';
import { InternUserReactiveService } from 'src/app/service/intern-user-reactive.service';
import { ToastComponent } from 'src/app/share/toast/toast.component';

@Component({
  selector: 'app-industry-supervisor',
  templateUrl: './industry-supervisor.component.html',
  styleUrls: ['./industry-supervisor.component.css']
})
export class IndustrySupervisorComponent implements OnInit {
  @ViewChild('toast') toast!: ToastComponent;

  constructor(private internUserReactiveService: InternUserReactiveService, private internCommonReactiveService: InternCommonReactiveService, public appUtilityService: AppUtilityService) {}

  industrySV$!: Observable<IndustrySupervisorResponse>;
  companies$!: Observable<CompanyResponse[]>;

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

  ngOnInit(): void {
    this.getCompanies();
    this.getIndustrySV();
  }

  getIndustrySV() {
    this.industrySV$ = this.internUserReactiveService.getIndustrySv(sessionStorage.getItem('userId')!).pipe(
      map((res) => {
        this.industrySvFormGroup.controls['supervisorId'].setValue(res.industrySvId);
        this.industrySvFormGroup.controls['supervisorName'].setValue(res.industrySvName);
        this.industrySvFormGroup.controls['supervisorPhone'].setValue(res.industrySvPhone);
        this.industrySvFormGroup.controls['supervisorEmail'].setValue(res.industrySvEmail);
        this.industrySvFormGroup.controls['supervisorPassword'].setValue(res.industrySvPassword);
        this.industrySvFormGroup.controls['supervisorGender'].setValue(res.industrySvGender);
        this.industrySvFormGroup.controls['supervisorPosition'].setValue(res.industrySvPosition);
        this.industrySvFormGroup.controls['companyId'].setValue(res.companyId);

        return res;
      })
    );
  }

  getCompanies() {
    this.companies$ = this.internCommonReactiveService.getCompanies();
  }

  onSubmitForm() {
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

    this.internUserReactiveService.updateIndustrySv(industrySupervisor).subscribe({
      next: (res) => {
        if (this.appUtilityService.isObjectNotEmpty(res)) {
          this.getCompanies();
          this.getIndustrySV();
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
