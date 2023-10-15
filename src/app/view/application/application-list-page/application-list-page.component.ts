import { Component, ViewChild } from '@angular/core';
import { ApplicationRequest } from 'src/app/model/Request/ApplicationRequest';
import { CompanyResponse } from 'src/app/model/Response/CompanyResponse';
import { AppUtilityService } from 'src/app/service/app-utility.service';
import { InternCoreService } from 'src/app/service/intern-core.service';
import { ModalComponent } from 'src/app/share/modal/modal.component';
import { ToastComponent } from 'src/app/share/toast/toast.component';
import { ApplicationListDatatableComponent } from '../application-list-datatable/application-list-datatable.component';
import { ApplicationResultDatatableComponent } from '../application-result-datatable/application-result-datatable.component';

@Component({
  selector: 'app-application-list-page',
  templateUrl: './application-list-page.component.html',
  styleUrls: ['./application-list-page.component.css']
})
export class ApplicationListPageComponent {
  company!: CompanyResponse;

  @ViewChild('toast') toast!: ToastComponent;
  @ViewChild('applyModal') applyModal!: ModalComponent;
  @ViewChild('agreeModal') agreeModal!: ModalComponent;
  @ViewChild('disagreeModal') disagreeModal!: ModalComponent;

  @ViewChild('companyDatatable') companyDatatable!: ApplicationListDatatableComponent;
  @ViewChild('resultDatatable') resultDatatable!: ApplicationResultDatatableComponent;

  constructor(private internCoreService: InternCoreService, public appUtilityService: AppUtilityService) {}
  
  onOpenAgreeModal(data: any) {
    console.log(data)
    this.agreeModal.open(this.agreeModal.childContent);
  }

  onOpenDisagreeModal(data: any) {
    console.log(data)
    this.disagreeModal.open(this.disagreeModal.childContent);
  }

  onInsertApplication(companyId: string) {
    let application: ApplicationRequest = {
      studentMatricNum: sessionStorage.getItem('userId')!,
      companyId: companyId
    }

    this.internCoreService.insertApplication(application).subscribe({
      next: (res) => {
        if (this.appUtilityService.isObjectNotEmpty(res.data)) {
          this.toast.open(res.message_desc!, 'success');
        } else {
          this.toast.open(res.error_desc!, 'danger');
        }

        this.companyDatatable.reRender();
        this.resultDatatable.reRender();
        this.applyModal.close();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onUpdateApplication(applicationId: string, status: string) {
    let application: ApplicationRequest = {
      applicationId: applicationId,
      applicationStudStatus: status
    }

    this.internCoreService.updateApplication(application).subscribe({
      next: (res) => {
        if (this.appUtilityService.isObjectNotEmpty(res.data)) {
          this.toast.open(res.message_desc!, 'success');
        } else {
          this.toast.open(res.error_desc!, 'danger');
        }

        this.companyDatatable.reRender();
        this.resultDatatable.reRender();
        this.disagreeModal.close();
        this.agreeModal.close();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
