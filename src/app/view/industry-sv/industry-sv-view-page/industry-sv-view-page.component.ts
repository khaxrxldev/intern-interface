import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyResponse } from 'src/app/model/Response/CompanyResponse';
import { IndustrySupervisorResponse } from 'src/app/model/Response/IndustrySupervisorResponse';
import { InternCommonService } from 'src/app/service/intern-common.service';
import { InternUserService } from 'src/app/service/intern-user.service';

@Component({
  selector: 'app-industry-sv-view-page',
  templateUrl: './industry-sv-view-page.component.html',
  styleUrls: ['./industry-sv-view-page.component.css']
})
export class IndustrySvViewPageComponent {
  companies: CompanyResponse[] = [];
  industrySupervisor!: IndustrySupervisorResponse;

  constructor(private internCommonService: InternCommonService, private internUserService: InternUserService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.internCommonService.retrieveCompanies().subscribe({
      next: (res) => {
        this.companies = res.data.companies;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.internUserService.retrieveIndustrySupervisor(this.activatedRoute.snapshot.paramMap.get("industrySvId")!).subscribe({
          next: (res) => {
            this.industrySupervisor = res.data.industrySupervisor;
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
    });
  }
}
