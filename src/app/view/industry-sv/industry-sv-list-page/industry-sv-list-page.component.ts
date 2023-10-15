import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/share/modal/modal.component';
import { ToastComponent } from 'src/app/share/toast/toast.component';
import { IndustrySvDatatableComponent } from '../industry-sv-datatable/industry-sv-datatable.component';
import { CompanyResponse } from 'src/app/model/Response/CompanyResponse';
import { InternUserService } from 'src/app/service/intern-user.service';
import { InternCommonService } from 'src/app/service/intern-common.service';
import { AppUtilityService } from 'src/app/service/app-utility.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IndustrySupervisorRequest } from 'src/app/model/Request/IndustrySupervisorRequest';
import { IndustrySupervisorResponse } from 'src/app/model/Response/IndustrySupervisorResponse';

@Component({
  selector: 'app-industry-sv-list-page',
  templateUrl: './industry-sv-list-page.component.html',
  styleUrls: ['./industry-sv-list-page.component.css']
})
export class IndustrySvListPageComponent implements OnInit {
  @ViewChild('modal') modal!: ModalComponent;
  @ViewChild('toast') toast!: ToastComponent;
  @ViewChild('datatable') datatable!: IndustrySvDatatableComponent;

  submitStatus: boolean = false;
  companies: CompanyResponse[] = [];

  constructor(private internUserService: InternUserService, private internCommonService: InternCommonService, public appUtilityService: AppUtilityService) {}
  
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

  onSubmitForm() {
    this.submitStatus = true;
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

    if (!this.industrySvFormGroup.value.supervisorId) {
      this.onInsertIndutrySupervisor(industrySupervisor);
    } else {
      this.onUpdateIndutrySupervisor(industrySupervisor);
    }
  }

  onInsertIndutrySupervisor(industrySupervisor: IndustrySupervisorRequest) {
    this.internUserService.insertIndustrySupervisor(industrySupervisor).subscribe({
      next: (res) => {
        if (this.appUtilityService.isObjectNotEmpty(res.data)) {
          this.toast.open(res.message_desc!, 'success');
          this.datatable.reRender();
        } else {
          this.toast.open(res.error_desc!, 'danger');
        }

        this.submitStatus = false;
        this.industrySvFormGroup.reset();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onUpdateIndutrySupervisor(industrySupervisor: IndustrySupervisorRequest) {
    this.internUserService.updateIndustrySupervisor(industrySupervisor).subscribe({
      next: (res) => {
        if (this.appUtilityService.isObjectNotEmpty(res.data)) {
          this.toast.open(res.message_desc!, 'success');
          this.datatable.reRender();
        } else {
          this.toast.open(res.error_desc!, 'danger');
        }

        this.submitStatus = false;
        this.industrySvFormGroup.reset();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onSetForm(industrySupervisor: IndustrySupervisorResponse) {
    this.industrySvFormGroup.controls['supervisorId'].setValue(industrySupervisor.industrySvId);
    this.industrySvFormGroup.controls['supervisorName'].setValue(industrySupervisor.industrySvName);
    this.industrySvFormGroup.controls['supervisorPhone'].setValue(industrySupervisor.industrySvPhone);
    this.industrySvFormGroup.controls['supervisorEmail'].setValue(industrySupervisor.industrySvEmail);
    this.industrySvFormGroup.controls['supervisorPassword'].setValue(industrySupervisor.industrySvPassword);
    this.industrySvFormGroup.controls['supervisorGender'].setValue(industrySupervisor.industrySvGender);
    this.industrySvFormGroup.controls['supervisorPosition'].setValue(industrySupervisor.industrySvPosition);
    this.industrySvFormGroup.controls['companyId'].setValue(industrySupervisor.companyId);
  }

  onConfirmDelete(deleteId: string) {
    this.internUserService.deleteIndustrySupervisor(deleteId).subscribe({
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
