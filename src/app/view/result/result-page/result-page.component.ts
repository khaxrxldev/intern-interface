import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, map, of, switchMap } from 'rxjs';
import { StudentResultResponse } from 'src/app/model/Response/StudentResultResponse';
import { AppUtilityService } from 'src/app/service/app-utility.service';
import { InternCoreService } from 'src/app/service/intern-core.service';
import { InternUserReactiveService } from 'src/app/service/intern-user-reactive.service';
import { DatatableComponent } from 'src/app/share/datatable/datatable.component';

interface columnDef {
  columnName?: string,
  columnTitle?: string,
  columnDisplay?: string,
  columnContent?: string,
  columnSortable?: boolean,
  columnFilterType?: string
}

interface student {
  studentMatricNum?: string,
  studentName?: string,
  studentClass?: string,
  studentStatus?: string,
  studentStatusContent?: string,
  subject1TotalMark?: string,
  subject1Grade?: string,
  subject1Pointer?: string,
  subject2TotalMark?: string,
  subject2Grade?: string,
  subject2Pointer?: string
}

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.css']
})
export class ResultPageComponent implements OnInit {
  @ViewChild('ResultDatatable') datatable!: DatatableComponent;

  customColumnString: string = '';

  classList: string[] = [];
  studentResultsDatatable$!: Observable<any[]>;
  studentResults$!: Observable<StudentResultResponse[]>;
  
  columns: columnDef[] = [
    {columnName: 'studentMatricNum', columnTitle: 'Matric Number', columnDisplay: 'DB', columnSortable: true, columnFilterType: 'PARTIAL'},
    {columnName: 'studentName', columnTitle: 'Name', columnDisplay: 'DB', columnSortable: true, columnFilterType: 'PARTIAL'},
    {columnName: 'studentClass', columnTitle: 'Class', columnDisplay: 'DB', columnSortable: true, columnFilterType: 'PARTIAL'},
    {columnName: 'studentStatusContent', columnTitle: 'Status', columnDisplay: 'HTML', columnSortable: false, columnFilterType: 'PARTIAL'},
    {columnName: 'subject1TotalMark', columnTitle: 'Total Mark', columnDisplay: 'DB', columnSortable: true, columnFilterType: 'EXACT'},
    {columnName: 'subject1Grade', columnTitle: 'Grade', columnDisplay: 'DB', columnSortable: true, columnFilterType: 'EXACT'},
    {columnName: 'subject1Pointer', columnTitle: 'Pointer', columnDisplay: 'DB', columnSortable: true, columnFilterType: 'EXACT'},
    {columnName: 'subject2TotalMark', columnTitle: 'Total Mark', columnDisplay: 'DB', columnSortable: true, columnFilterType: 'EXACT'},
    {columnName: 'subject2Grade', columnTitle: 'Grade', columnDisplay: 'DB', columnSortable: true, columnFilterType: 'EXACT'},
    {columnName: 'subject2Pointer', columnTitle: 'Pointer', columnDisplay: 'DB', columnSortable: true, columnFilterType: 'EXACT'},
  ]

  constructor(public appUtilityService: AppUtilityService, private internCoreService: InternCoreService, private internUserReactiveService: InternUserReactiveService) {}

  classList$ = this.internUserReactiveService.getStudents().pipe(
    map(res => res.map(a => a.studentClass!)),
    switchMap(res => of(res.filter((item, index) => res.indexOf(item) === index).sort()))
  )

  ngOnInit(): void {
    let tr1 = document.createElement('tr') as HTMLTableRowElement;
    let th1tr1 = document.createElement('th') as HTMLTableCellElement;
    th1tr1.innerHTML = 'MATRIC NUMBER';
    th1tr1.rowSpan = 2;
    let th2tr1 = document.createElement('th') as HTMLTableCellElement;
    th2tr1.innerHTML = 'NAME';
    th2tr1.rowSpan = 2;
    let th3tr1 = document.createElement('th') as HTMLTableCellElement;
    th3tr1.innerHTML = 'CLASS';
    th3tr1.rowSpan = 2;
    let th4tr1 = document.createElement('th') as HTMLTableCellElement;
    th4tr1.innerHTML = 'STATUS';
    th4tr1.rowSpan = 2;
    let th5tr1 = document.createElement('th') as HTMLTableCellElement;
    th5tr1.innerHTML = 'CST 656';
    th5tr1.colSpan = 3;
    let th6tr1 = document.createElement('th') as HTMLTableCellElement;
    th6tr1.innerHTML = 'CST 666';
    th6tr1.colSpan = 3;

    tr1.innerHTML = th1tr1.outerHTML + th2tr1.outerHTML + th3tr1.outerHTML + th4tr1.outerHTML + th5tr1.outerHTML + th6tr1.outerHTML;

    let tr2 = document.createElement('tr') as HTMLTableRowElement;
    let th1tr2 = document.createElement('th') as HTMLTableCellElement;
    th1tr2.innerHTML = 'TOTAL MARK';
    let th2tr2 = document.createElement('th') as HTMLTableCellElement;
    th2tr2.innerHTML = 'GRADE';
    let th3tr2 = document.createElement('th') as HTMLTableCellElement;
    th3tr2.innerHTML = 'POINTER';
    let th4tr2 = document.createElement('th') as HTMLTableCellElement;
    th4tr2.innerHTML = 'TOTAL MARK';
    let th5tr2 = document.createElement('th') as HTMLTableCellElement;
    th5tr2.innerHTML = 'GRADE';
    let th6tr2 = document.createElement('th') as HTMLTableCellElement;
    th6tr2.innerHTML = 'POINTER';

    tr2.innerHTML = th1tr2.outerHTML + th2tr2.outerHTML + th3tr2.outerHTML + th4tr2.outerHTML + th5tr2.outerHTML + th6tr2.outerHTML;

    this.customColumnString = tr1.outerHTML + tr2.outerHTML;
    this.getStudentResults();
  }

  getStudentResults() {
    this.studentResultsDatatable$ = this.internCoreService.retrieveStudentResults().pipe(
      map(res => this.appUtilityService.isObjectNotEmpty(res.data) ? res.data['studentResults'] : []),
      map((res) => {
        let students: student[] = [];
        let studentResults: StudentResultResponse[] = res;
        
        studentResults.forEach((studentResult: StudentResultResponse) => {
          let student: student = {
            studentMatricNum: studentResult.studentMatricNum,
            studentName: studentResult.studentName,
            studentClass: studentResult.studentClass,
            studentStatus: studentResult.studentEvaluationsStatus
          };

          let span = document.createElement('span') as HTMLSpanElement;
          span.classList.add('rounded-pill');
          span.classList.add('badge-style');

          let i = document.createElement('i') as HTMLElement;
          i.classList.add('fa');
          i.classList.add('fa-circle');
          i.classList.add('me-2');

          switch (studentResult.studentEvaluationsStatus) {
            case 'PND':
              span.classList.add('badge-warning');
              span.innerHTML = i.outerHTML + 'Pending';
              break;
            case 'CMP':
              span.classList.add('badge-success');
              span.innerHTML = i.outerHTML + 'Complete';

              student.subject1TotalMark = studentResult.subject1TotalMark?.toFixed(2);
              student.subject1Grade = studentResult.subject1Grade;
              student.subject1Pointer = studentResult.subject1Pointer;
              student.subject2TotalMark = studentResult.subject2TotalMark?.toFixed(2);
              student.subject2Grade = studentResult.subject2Grade;
              student.subject2Pointer = studentResult.subject2Pointer;
              break;
          }

          student.studentStatusContent = span.outerHTML;
          students.push(student);
        });

        return students;
      }),
      map((res) => {
        let classSelect = document.getElementById('classSelect') as HTMLSelectElement;
        if (classSelect.value) {
          res = res.filter(res => res.studentClass === classSelect.value);
        }
        
        let statusSelect = document.getElementById('statusSelect') as HTMLSelectElement;
        if (statusSelect.value) {
          res = res.filter(res => res.studentStatus === statusSelect.value);
        }
        
        return res;
      })
    );

    this.studentResults$ = this.internCoreService.retrieveStudentResults().pipe(
      map(res => this.appUtilityService.isObjectNotEmpty(res.data) ? res.data['studentResults'] : [])
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
