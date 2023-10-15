import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicationRequest } from 'src/app/model/Request/ApplicationRequest';
import { ApplicationResponse } from 'src/app/model/Response/ApplicationResponse';
import { AppUtilityService } from 'src/app/service/app-utility.service';
import { InternCoreService } from 'src/app/service/intern-core.service';

@Component({
  selector: 'app-company-approval',
  templateUrl: './company-approval.component.html',
  styleUrls: ['./company-approval.component.css']
})
export class CompanyApprovalComponent implements OnInit {
  application!: ApplicationResponse;

  constructor(private internCoreService: InternCoreService, private activatedRoute: ActivatedRoute, public appUtilityService: AppUtilityService) {}

  ngOnInit(): void {
    this.onRetrieveApplication();
  }

  onRetrieveApplication() {
    this.internCoreService.retrieveApplicationByApplicationId(this.activatedRoute.snapshot.paramMap.get("applicationId")!).subscribe({
      next: (res) => {
        if (this.appUtilityService.isObjectNotEmpty(res.data)) {
          this.application = res.data.application;
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onUpdateApplication(applicationId: string, status: string) {
    let application: ApplicationRequest = {
      applicationId: applicationId,
      applicationCompStatus: status,
      applicationStudStatus: 'RVW'
    }

    this.internCoreService.updateApplication(application).subscribe({
      next: (res) => {
        console.log(res);
        this.onRetrieveApplication();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
