import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CriteriaResponse } from 'src/app/model/Response/CriteriaResponse';
import { EvaluationResponse } from 'src/app/model/Response/EvaluationResponse';
import { AppUtilityService } from 'src/app/service/app-utility.service';
import { InternCoreService } from 'src/app/service/intern-core.service';

@Component({
  selector: 'app-criteria-view-page',
  templateUrl: './criteria-view-page.component.html',
  styleUrls: ['./criteria-view-page.component.css']
})
export class CriteriaViewPageComponent implements OnInit {
  evaluations: EvaluationResponse[] = [];
  criteria!: CriteriaResponse;

  constructor(private internCoreService: InternCoreService, public appUtilityService: AppUtilityService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.internCoreService.retrieveEvaluations().subscribe({
      next: (res) => {
        if (this.appUtilityService.isObjectNotEmpty(res.data)) {
          this.evaluations = res.data.evaluations;
        }
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.internCoreService.retrieveCriteriaByCriteriaId(this.activatedRoute.snapshot.paramMap.get("criteriaId")!).subscribe({
          next: (res) => {
            this.criteria = res.data.criteria;
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
    });
  }
}
