import { Component, OnInit } from '@angular/core';
import { Observable, map, of, switchMap } from 'rxjs';
import { StudentResultResponse } from 'src/app/model/Response/StudentResultResponse';
import { AppUtilityService } from 'src/app/service/app-utility.service';
import { InternCoreService } from 'src/app/service/intern-core.service';
import { InternUserReactiveService } from 'src/app/service/intern-user-reactive.service';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.css']
})
export class ResultPageComponent implements OnInit {
  classList: string[] = [];
  studentResult$!: Observable<StudentResultResponse[]>;

  constructor(public appUtilityService: AppUtilityService, private internCoreService: InternCoreService, private internUserReactiveService: InternUserReactiveService) {}

  classList$ = this.internUserReactiveService.getStudents().pipe(
    map(res => res.map(a => a.studentClass!)),
    switchMap(res => of(res.filter((item, index) => res.indexOf(item) === index).sort()))
  )

  ngOnInit(): void {
    this.studentResult$ = this.internCoreService.retrieveStudentResults().pipe(
      map(res => this.appUtilityService.isObjectNotEmpty(res.data) ? res.data['studentResults'] : []),
    );
  }

  onFilterTable(event: any) {
    let searchTerm = event.target.value.toUpperCase();
    let table = document.getElementById("resultTableId") as HTMLTableElement;
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

  onSelectFilterTable(evtClass: any, evtStatus: any) {
    let table = document.getElementById("resultTableId") as HTMLTableElement;
    let trList = table.getElementsByTagName("tr") as HTMLCollectionOf<HTMLTableRowElement>;

    for (let i = 0; i < trList.length; i++) {
      let tdClass = trList[i].getElementsByTagName("td")[2] as HTMLTableCellElement;
      let tdStatus = trList[i].getElementsByTagName("td")[3] as HTMLTableCellElement;

      if (tdClass && tdStatus) {
        let showTrStatus = true;

        if (evtClass) {
          if (!(tdClass.innerText.indexOf(evtClass) > -1)) {
            showTrStatus = false;
          }
        }

        if (evtStatus) {
          if (!(tdStatus.innerText.indexOf(evtStatus) > -1)) {
            showTrStatus = false;
          }
        }

        if (showTrStatus) {
          trList[i].style.display = "";
        } else {
          trList[i].style.display = "none";
        }
      }       
    }
  }
}
