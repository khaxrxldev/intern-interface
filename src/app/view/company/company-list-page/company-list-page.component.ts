import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InternCommonService } from 'src/app/service/intern-common.service';
import { ModalComponent } from 'src/app/share/modal/modal.component';
import { AppUtilityService } from 'src/app/service/app-utility.service';
import { CompanyDatatableComponent } from '../company-datatable/company-datatable.component';
import { ToastComponent } from 'src/app/share/toast/toast.component';
import { CompanyResponse } from 'src/app/model/Response/CompanyResponse';
import { CompanyRequest } from 'src/app/model/Request/CompanyRequest';
import { InputFileType } from 'src/app/validator/input-file-type';
import { ChartType } from 'angular-google-charts';
import { InternUserService } from 'src/app/service/intern-user.service';

@Component({
  selector: 'app-company-list-page',
  templateUrl: './company-list-page.component.html',
  styleUrls: ['./company-list-page.component.css']
})
export class CompanyListPageComponent implements OnInit {
  chartData = [];
  chartOptions = {};
  chartColumns: string[] = [];
  chartTypeDisplay: string = 'STD';
  chartType: ChartType = ChartType.Bar;

  @ViewChild('modal') modal!: ModalComponent;
  @ViewChild('toast') toast!: ToastComponent;
  @ViewChild('datatable') datatable!: CompanyDatatableComponent;

  submitStatus: boolean = false;
  company: CompanyResponse = {};

  constructor(private internCommonService: InternCommonService, private internUserService: InternUserService, public appUtilityService: AppUtilityService) {}

  ngOnInit(): void {
    this.setChartStudents();
  }

  companyFormGroup: FormGroup = new FormGroup({
    companyId: new FormControl(null, []),
    companyName: new FormControl(null, [ Validators.required ]),
    companyAddress: new FormControl(null, [ Validators.required ]),
    companyPhone: new FormControl(null, []),
    companyEmail: new FormControl(null, [ Validators.email ]),
    companyWebsite: new FormControl(null, []),
    companyBrochure: new FormControl(null, [ InputFileType.validateFileType(['pdf']) ]),
    companyHrName: new FormControl(null, [ Validators.required ]),
    companyHrPhone: new FormControl(null, [ Validators.required ]),
    companyHrEmail: new FormControl(null, [ Validators.required, Validators.email ]),
    companyHrGender: new FormControl(null, [ Validators.required ])
  });
  
  onSubmitForm(fileInput: HTMLInputElement) {
    this.submitStatus = true;
    if (this.companyFormGroup.invalid) {
      return;
    }

    let company: CompanyRequest = {
      companyId: this.companyFormGroup.controls['companyId'].value,
      companyName: this.companyFormGroup.controls['companyName'].value,
      companyAddress: this.companyFormGroup.controls['companyAddress'].value,
      companyPhone: this.companyFormGroup.controls['companyPhone'].value,
      companyEmail: this.companyFormGroup.controls['companyEmail'].value,
      companyWebsite: this.companyFormGroup.controls['companyWebsite'].value ? 'https://' + this.companyFormGroup.controls['companyWebsite'].value : '',
      companyHrName: this.companyFormGroup.controls['companyHrName'].value,
      companyHrPhone: this.companyFormGroup.controls['companyHrPhone'].value,
      companyHrEmail: this.companyFormGroup.controls['companyHrEmail'].value,
      companyHrGender: this.companyFormGroup.controls['companyHrGender'].value
    }

    if (!this.companyFormGroup.value.companyId) {
      this.onInsertCompany(company, fileInput.files ? fileInput.files![0]: new File([], ''));
    } else {
      this.onUpdateCompany(company, fileInput.files ? fileInput.files![0]: new File([], ''));
    }
  }

  onInsertCompany(company: CompanyRequest, brochureFile: File) {
    this.internCommonService.insertCompany(company, brochureFile).subscribe({
      next: (res) => {
        if (this.appUtilityService.isObjectNotEmpty(res.data)) {
          this.toast.open(res.message_desc!, 'success');
          this.datatable.reRender();
        } else {
          this.toast.open(res.error_desc!, 'danger');
        }

        this.submitStatus = false;
        this.companyFormGroup.reset();
        this.company = {};
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onUpdateCompany(company: CompanyRequest, brochureFile: File) {
    this.internCommonService.updateCompany(company, brochureFile).subscribe({
      next: (res) => {
        if (this.appUtilityService.isObjectNotEmpty(res.data)) {
          this.toast.open(res.message_desc!, 'success');
          this.datatable.reRender();
        } else {
          this.toast.open(res.error_desc!, 'danger');
        }

        this.submitStatus = false;
        this.companyFormGroup.reset();
        this.company = {};
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onSetForm(company: CompanyResponse) {
    this.companyFormGroup.controls['companyId'].setValue(company.companyId);
    this.companyFormGroup.controls['companyName'].setValue(company.companyName);
    this.companyFormGroup.controls['companyAddress'].setValue(company.companyAddress);
    this.companyFormGroup.controls['companyPhone'].setValue(company.companyPhone);
    this.companyFormGroup.controls['companyEmail'].setValue(company.companyEmail);
    this.companyFormGroup.controls['companyWebsite'].setValue(company.companyWebsite ? company.companyWebsite?.replace('https://', '') : '');
    this.companyFormGroup.controls['companyHrName'].setValue(company.companyHrName);
    this.companyFormGroup.controls['companyHrPhone'].setValue(company.companyHrPhone);
    this.companyFormGroup.controls['companyHrEmail'].setValue(company.companyHrEmail);
    this.companyFormGroup.controls['companyHrGender'].setValue(company.companyHrGender);
  }

  onConfirmDelete(deleteId: string) {
    this.internCommonService.deleteCompanyByCompanyId(deleteId).subscribe({
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

  setChart(event: any) {
    this.chartData = [];
    this.chartColumns = [];
    this.chartTypeDisplay = event.target.value;
    
    switch (this.chartTypeDisplay) {
      case 'STD':
        this.setChartStudents();
        break;
      case 'SPV':
        this.setChartIndustrySupervisors();
        break;
    }
  }

  setChartStudents() {
    this.chartColumns = ['Company', 'Ongoing', 'Completed'];
    this.chartOptions = {
      legend: { position: 'none' },
      colors: ['#198754', '#ffc107'],
      height: 280
    };

    this.internUserService.retrieveStudentsChart().subscribe({
      next: (res) => {
        let chartDataList: [] = res.data.studentChartList;

        chartDataList.forEach((chartData: any[]) => {
          for (let index = 0; index < chartData.length; index++) {
            if (index == 0) {
              chartData[index] = this.appUtilityService.textEllipsis(chartData[index], window.innerWidth < 900 ? 8 : 15);
            } else {
              chartData[index] = +(chartData[index]);
            }
          }
        })

        this.chartData = chartDataList;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  setChartIndustrySupervisors() {
    this.chartColumns = ['Company', 'Supervisor'];
    this.chartOptions = {
      legend: { position: 'none' },
      colors: ['#0d6efd'],
      height: 280
    };

    this.internUserService.retrieveIndustrySupervisorsChart().subscribe({
      next: (res) => {
        let chartDataList: [] = res.data.industrySupervisorChartList;

        chartDataList.forEach((chartData: any[]) => {
          for (let index = 0; index < chartData.length; index++) {
            if (index == 0) {
              chartData[index] = this.appUtilityService.textEllipsis(chartData[index], window.innerWidth < 900 ? 8 : 15);
            } else {
              chartData[index] = +(chartData[index]);
            }
          }
        })

        this.chartData = chartDataList;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
