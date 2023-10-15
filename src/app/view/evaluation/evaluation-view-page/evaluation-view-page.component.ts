import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EvaluationResponse } from 'src/app/model/Response/EvaluationResponse';
import { AppUtilityService } from 'src/app/service/app-utility.service';
import { InternCoreService } from 'src/app/service/intern-core.service';
import { ToastComponent } from 'src/app/share/toast/toast.component';

@Component({
  selector: 'app-evaluation-view-page',
  templateUrl: './evaluation-view-page.component.html',
  styleUrls: ['./evaluation-view-page.component.css']
})
export class EvaluationViewPageComponent {
  @ViewChild('toast') toast!: ToastComponent;
  
  evaluation!: EvaluationResponse;

  constructor(private internCoreService: InternCoreService, public appUtilityService: AppUtilityService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.internCoreService.retrieveEvaluationByevaluationId(this.activatedRoute.snapshot.paramMap.get("evaluationId")!).subscribe({
      next: (res) => {
        this.evaluation = res.data.evaluation;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
