import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/share/modal/modal.component';
import { ToastComponent } from 'src/app/share/toast/toast.component';
import { AcademicSvDatatableComponent } from '../academic-sv-datatable/academic-sv-datatable.component';
import { InternUserService } from 'src/app/service/intern-user.service';
import { AppUtilityService } from 'src/app/service/app-utility.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AcademicSupervisorRequest } from 'src/app/model/Request/AcademicSupervisorRequest';
import { AcademicSupervisorResponse } from 'src/app/model/Response/AcademicSupervisorResponse';

@Component({
  selector: 'app-academic-sv-list-page',
  templateUrl: './academic-sv-list-page.component.html',
  styleUrls: ['./academic-sv-list-page.component.css']
})
export class AcademicSvListPageComponent implements OnInit {
  @ViewChild('modal') modal!: ModalComponent;
  @ViewChild('toast') toast!: ToastComponent;
  @ViewChild('datatable') datatable!: AcademicSvDatatableComponent;

  submitStatus: boolean = false;

  constructor(private internUserService: InternUserService, public appUtilityService: AppUtilityService) {}
  
  ngOnInit(): void {
  }

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

  onSubmitForm() {
    this.submitStatus = true;
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

    if (!this.academicSvFormGroup.value.supervisorId) {
      this.onInsertAcademicSupervisor(academicSupervisor);
    } else {
      this.onUpdateAcademicSupervisor(academicSupervisor);
    }
  }

  onInsertAcademicSupervisor(academicSupervisor: AcademicSupervisorRequest) {
    this.internUserService.insertAcademicSupervisor(academicSupervisor).subscribe({
      next: (res) => {
        if (this.appUtilityService.isObjectNotEmpty(res.data)) {
          this.toast.open(res.message_desc!, 'success');
          this.datatable.reRender();
        } else {
          this.toast.open(res.error_desc!, 'danger');
        }

        this.submitStatus = false;
        this.academicSvFormGroup.reset();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onUpdateAcademicSupervisor(academicSupervisor: AcademicSupervisorRequest) {
    this.internUserService.updateAcademicSupervisor(academicSupervisor).subscribe({
      next: (res) => {
        if (this.appUtilityService.isObjectNotEmpty(res.data)) {
          this.toast.open(res.message_desc!, 'success');
          this.datatable.reRender();
        } else {
          this.toast.open(res.error_desc!, 'danger');
        }

        this.submitStatus = false;
        this.academicSvFormGroup.reset();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onSetForm(academicSupervisor: AcademicSupervisorResponse) {
    this.academicSvFormGroup.controls['supervisorId'].setValue(academicSupervisor.academicSvId);
    this.academicSvFormGroup.controls['supervisorName'].setValue(academicSupervisor.academicSvName);
    this.academicSvFormGroup.controls['supervisorPhone'].setValue(academicSupervisor.academicSvPhone);
    this.academicSvFormGroup.controls['supervisorEmail'].setValue(academicSupervisor.academicSvEmail);
    this.academicSvFormGroup.controls['supervisorPassword'].setValue(academicSupervisor.academicSvPassword);
    this.academicSvFormGroup.controls['supervisorGender'].setValue(academicSupervisor.academicSvGender);
    this.academicSvFormGroup.controls['supervisorPosition'].setValue(academicSupervisor.academicSvPosition);
    this.academicSvFormGroup.controls['supervisorCoordinator'].setValue(academicSupervisor.academicSvCoordinator);
  }

  onConfirmDelete(deleteId: string) {
    this.internUserService.deleteAcademicSupervisor(deleteId).subscribe({
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
