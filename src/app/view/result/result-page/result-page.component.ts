import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { StudentResponse } from 'src/app/model/Response/StudentResponse';
import { StudentResultResponse } from 'src/app/model/Response/StudentResultResponse';
import { AppUtilityService } from 'src/app/service/app-utility.service';
import { InternCoreService } from 'src/app/service/intern-core.service';
import { InternUserService } from 'src/app/service/intern-user.service';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.css']
})
export class ResultPageComponent implements OnInit {

  studentResult$!: Observable<StudentResultResponse[]>;

  constructor(public appUtilityService: AppUtilityService, private internCoreService: InternCoreService) {}

  ngOnInit(): void {
    this.studentResult$ = this.internCoreService.retrieveStudentResults().pipe(
      map(res => this.appUtilityService.isObjectNotEmpty(res.data) ? res.data['studentResults'] : []),
    );
  }

  onFilterTable(event: any) {
    let searchTerm = event.target.value.toUpperCase();
    let table = document.getElementById("myTable") as HTMLTableElement;
    let trList = table.getElementsByTagName("tr") as HTMLCollectionOf<HTMLTableRowElement>;
    for (let i = 0; i < trList.length; i++) {
      if (i > 1) {
        let tdList = trList[i].getElementsByTagName("td") as HTMLCollectionOf<HTMLTableCellElement>;
        let searchStatus = false;
        for(let j = 0; j < tdList.length; j++) {
          let td = tdList[j] as HTMLTableCellElement;
          if (td) {
            let tdContent = td.textContent || td.innerText;

            if (tdContent.toUpperCase().indexOf(searchTerm) > -1) {
              trList[i].style.display = "";
              j = tdList.length;
              searchStatus = true;
            }
          }
        }

        if(!searchStatus) {
          trList[i].style.display = "none";
        }
      }
    }
  }
}
