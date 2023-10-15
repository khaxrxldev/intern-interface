import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyResponse } from 'src/app/model/Response/CompanyResponse';
import { AppUtilityService } from 'src/app/service/app-utility.service';
import { InternCommonService } from 'src/app/service/intern-common.service';

@Component({
  selector: 'app-company-view-page',
  templateUrl: './company-view-page.component.html',
  styleUrls: ['./company-view-page.component.css']
})
export class CompanyViewPageComponent implements OnInit {
  company!: CompanyResponse;

  constructor(private internCommonService: InternCommonService, public appUtilityService: AppUtilityService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.internCommonService.retrieveCompanyByCompanyId(this.activatedRoute.snapshot.paramMap.get("companyId")!).subscribe({
      next: (res) => {
        this.company = res.data.company;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
