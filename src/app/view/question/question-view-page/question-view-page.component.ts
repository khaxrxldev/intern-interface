import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CriteriaResponse } from 'src/app/model/Response/CriteriaResponse';
import { QuestionResponse } from 'src/app/model/Response/QuestionResponse';
import { AppUtilityService } from 'src/app/service/app-utility.service';
import { InternCommonService } from 'src/app/service/intern-common.service';
import { InternCoreService } from 'src/app/service/intern-core.service';

@Component({
  selector: 'app-question-view-page',
  templateUrl: './question-view-page.component.html',
  styleUrls: ['./question-view-page.component.css']
})
export class QuestionViewPageComponent implements OnInit {
  question!: QuestionResponse;
  criterias: CriteriaResponse[] = [];

  constructor(private internCommonService: InternCommonService, private internCoreService: InternCoreService, private appUtilityService: AppUtilityService, private activatedRoute: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.internCoreService.retrieveCriterias().subscribe({
      next: (res) => {
        if (this.appUtilityService.isObjectNotEmpty(res.data)) {
          this.criterias = res.data.criterias;
        }
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.internCommonService.retrieveQuestionByQuestionId(this.activatedRoute.snapshot.paramMap.get("questionId")!).subscribe({
          next: (res) => {
            this.question = res.data.question;
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
    });
  }
}
