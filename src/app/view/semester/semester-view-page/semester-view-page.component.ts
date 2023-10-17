import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SemesterResponse } from 'src/app/model/Response/SemesterResponse';
import { AppUtilityService } from 'src/app/service/app-utility.service';
import { InternCommonService } from 'src/app/service/intern-common.service';

@Component({
  selector: 'app-semester-view-page',
  templateUrl: './semester-view-page.component.html',
  styleUrls: ['./semester-view-page.component.css']
})
export class SemesterViewPageComponent implements OnInit {
  semester!: SemesterResponse;

  constructor(private internCommonService: InternCommonService, public appUtilityService: AppUtilityService, private activatedRoute: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.internCommonService.retrieveSemesterBySemesterId(this.activatedRoute.snapshot.paramMap.get("semesterId")!).subscribe({
      next: (res) => {
        this.semester = res.data.semester;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}