import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AcademicSupervisorResponse } from 'src/app/model/Response/AcademicSupervisorResponse';
import { InternUserService } from 'src/app/service/intern-user.service';

@Component({
  selector: 'app-academic-sv-view-page',
  templateUrl: './academic-sv-view-page.component.html',
  styleUrls: ['./academic-sv-view-page.component.css']
})
export class AcademicSvViewPageComponent {
  academicSupervisor!: AcademicSupervisorResponse;

  constructor(private internUserService: InternUserService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.internUserService.retrieveAcademicSupervisor(this.activatedRoute.snapshot.paramMap.get("academicSvId")!).subscribe({
      next: (res) => {
        this.academicSupervisor = res.data.academicSupervisor;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
