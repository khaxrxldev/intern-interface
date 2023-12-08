import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { StudentEvaluationRequest } from 'src/app/model/Request/StudentEvaluationRequest';
import { StudentEvaluationResponse } from 'src/app/model/Response/StudentEvaluationResponse';
import { AppUtilityService } from 'src/app/service/app-utility.service';
import { InternCoreService } from 'src/app/service/intern-core.service';

@Component({
  selector: 'app-student-evaluation-datatable',
  templateUrl: './student-evaluation-datatable.component.html',
  styleUrls: ['./student-evaluation-datatable.component.css']
})
export class StudentEvaluationDatatableComponent implements AfterViewInit, OnDestroy, OnInit {
  
  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  
  @Input() filterStatus!: string;
  
  @Output() onViewResult = new EventEmitter<any>();
  @Output() onEvaluate = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();

  constructor(private internCoreService: InternCoreService, private appUtilityService: AppUtilityService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.dtOptions = {
      lengthChange: false,
      order: [[ 0, "asc" ]],
      info: false,
      pagingType: "simple",
      language: {
        "decimal":        "",
        "emptyTable":     "No data available in table",
        "info":           "Showing _START_ to _END_ of _TOTAL_ entries",
        "infoEmpty":      "Showing 0 to 0 of 0 entries",
        "infoFiltered":   "(filtered from _MAX_ total entries)",
        "infoPostFix":    "",
        "thousands":      ",",
        "lengthMenu":     "_MENU_",
        "loadingRecords": "Loading...",
        "processing":     "Processing...",
        "search":         "",
        "zeroRecords":    "No matching records found",
        "paginate": {
            "first":      "",
            "last":       "",
            "next":       "<i class='fa fa-chevron-right'></i>",
            "previous":   "<i class='fa fa-chevron-left'></i>"
        },
        "aria": {
            "sortAscending":  ": activate to sort column ascending",
            "sortDescending": ": activate to sort column descending"
        }
      },
      columns: [{
        title: 'Name',
        data: 'evaluation.evaluationName'
      }, {
        title: 'Status',
        data: ''
      }, {
        title: 'Evaluate Date',
        data: ''
      }, {
        title: 'Semester',
        data: 'semester.semesterCode'
      }, {
        title: 'Start Date',
        data: ''
      }, {
        title: 'End Date',
        data: ''
      }, {
        title: '',
        data: ''
      }],
      initComplete: function () {
        let search_input: HTMLElement = document.querySelector('.dataTables_wrapper .dataTables_filter input')!;
        search_input.classList.add('form-control', 'm-0');
      }
    };

    this.dtOptions.ajax = (dtParameters: any, callback) => {
      let studentEvaluation: StudentEvaluationRequest = {
        userLoginType: sessionStorage.getItem('userType') != 'COD' ? sessionStorage.getItem('userType')! : '',
        studentMatricNum: this.activatedRoute.snapshot.paramMap.get("studentId")!,
        studentEvaluationStatus: this.filterStatus
      };
      let studentEvaluations: StudentEvaluationResponse[] = [];
      
      this.internCoreService.filterStudentEvaluations(studentEvaluation).subscribe({
        next: (res) => {
          if (this.appUtilityService.isObjectNotEmpty(res.data)) {
            studentEvaluations = res.data.studentEvaluations
          }
          
          callback({
            recordsTotal: 0,
            recordsfilter: 0,
            data: studentEvaluations
          });
        },
        error: (err) => {
          console.log(err);
        }
      });
    };

    this.dtOptions.columnDefs = [
      {
        targets: 1,
        orderable: false,
        className: "align-center",
        render: function (data, type, row, meta) {
          let span = document.createElement('span') as HTMLSpanElement;
          span.classList.add('rounded-pill');
          span.classList.add('badge-style');

          let i = document.createElement('i') as HTMLElement;
          i.classList.add('fa');
          i.classList.add('fa-circle');
          i.classList.add('me-2');

          switch (row.studentEvaluationStatus) {
            case 'INC':
              span.classList.add('badge-danger');
              span.innerHTML = i.outerHTML + 'Incomplete';
              break;
            case 'CMP':
              span.classList.add('badge-success');
              span.innerHTML = i.outerHTML + 'Completed';
              break;
          }

          return span.outerHTML;
        }
      }, {
        targets: 2,
        render: function (data, type, row, meta) {
          if (row.studentEvaluationDate) {
            return new Date(row.studentEvaluationDate).toLocaleString('en-GB', { dateStyle: "short" }).toUpperCase() + ", " + new Date(row.studentEvaluationDate).toLocaleString('default', { hour12: true, timeStyle: "short" });
          } else {
            return '';
          }
        }
      }, {
        targets: 4,
        render: function (data, type, row, meta) {
          if (row.semester) {
            return new Date(row.semester.semesterStartEvaluateDate).toLocaleString('en-GB', { dateStyle: "short" }).toUpperCase() + ", " + new Date(row.semester.semesterStartEvaluateDate).toLocaleString('default', { hour12: true, timeStyle: "short" });
          } else {
            return '';
          }
        }
      }, {
        targets: 5,
        render: function (data, type, row, meta) {
          if (row.semester) {
            return new Date(row.semester.semesterEndEvaluateDate).toLocaleString('en-GB', { dateStyle: "short" }).toUpperCase() + ", " + new Date(row.semester.semesterEndEvaluateDate).toLocaleString('default', { hour12: true, timeStyle: "short" });
          } else {
            return '';
          }
        }
      }, {
        targets: -1,
        orderable: false,
        className: "align-center",
        render: function (data, type, row, meta) {
          let attachBtn = document.createElement('button') as HTMLButtonElement;
          attachBtn.classList.add('btn');
          attachBtn.classList.add('btn-secondary');
          attachBtn.classList.add('btn-sm');
          attachBtn.classList.add('me-2');
          attachBtn.setAttribute('id', 'attachBtn');
          attachBtn.title = 'Document';

          if (!row.studentEvaluationAttach) {
            attachBtn.disabled = true;
          }

          let attachImg = document.createElement('img') as HTMLImageElement;
          attachImg.src = '../../../../assets/icons/file-line.svg';
          attachImg.style.marginTop = '-2px';

          attachBtn.innerHTML = attachImg.outerHTML;

          let resultBtn = document.createElement('a') as HTMLAnchorElement;
          resultBtn.classList.add('btn');
          resultBtn.classList.add('btn-primary');
          resultBtn.classList.add('btn-sm');
          resultBtn.classList.add('m-1');
          resultBtn.setAttribute('id', 'resultBtn');
          resultBtn.title = 'Result';

          let resultImg = document.createElement('img') as HTMLImageElement;
          resultImg.src = '../../../../assets/icons/bar-chart-box-line.svg';
          resultImg.style.marginTop = '-2px';

          resultBtn.innerHTML = resultImg.outerHTML;

          let evaluateBtn = document.createElement('button') as HTMLButtonElement;
          evaluateBtn.classList.add('btn');
          evaluateBtn.classList.add('btn-info');
          evaluateBtn.classList.add('btn-sm');
          evaluateBtn.classList.add('m-1');
          evaluateBtn.setAttribute('id', 'evaluateBtn');
          evaluateBtn.title = 'Evaluate';

          let evaluateImg = document.createElement('img') as HTMLImageElement;
          evaluateImg.src = '../../../../assets/icons/draft-line-black.svg';
          evaluateImg.style.marginTop = '-2px';

          if (row.semester) {
            let fromDate: Date = new Date(row.semester.semesterStartEvaluateDate);
            let comparedDate: Date = new Date();
            let toDate: Date = new Date(row.semester.semesterEndEvaluateDate);
            if (!(fromDate.getTime() <= comparedDate.getTime() && toDate.getTime() >= comparedDate.getTime())) {
              evaluateBtn.setAttribute('disabled', 'true');
            }
          }
          
          evaluateBtn.innerHTML = evaluateImg.outerHTML;

          let deleteBtn = document.createElement('a') as HTMLAnchorElement;
          deleteBtn.classList.add('btn');
          deleteBtn.classList.add('btn-danger');
          deleteBtn.classList.add('btn-sm');
          deleteBtn.classList.add('m-1');
          deleteBtn.setAttribute('id', 'deleteBtn');
          deleteBtn.title = 'Delete';

          let deleteImg = document.createElement('img') as HTMLImageElement;
          deleteImg.src = '../../../../assets/icons/delete-bin-line.svg';
          deleteImg.style.marginTop = '-2px';

          deleteBtn.innerHTML = deleteImg.outerHTML;

          switch (sessionStorage.getItem('userType')) {
            case 'COD':
              return attachBtn.outerHTML + resultBtn.outerHTML + deleteBtn.outerHTML;
              break;
            case 'ACD':
              return attachBtn.outerHTML + evaluateBtn.outerHTML;
              break;
            case 'IND':
              return attachBtn.outerHTML + evaluateBtn.outerHTML;
              break;
          }
          return '';
        }
      }
    ];

    this.dtOptions.rowCallback = (row: Node, data: any[] | Object, index: number) => {
      $('td:last-child #attachBtn', row).off('click');
      $('td:last-child #attachBtn', row).on('click', () => {
        let studentEvaluation: StudentEvaluationResponse = data as StudentEvaluationResponse;
        this.appUtilityService.onDisplayFile(studentEvaluation.studentEvaluationAttach!);
      });

      $('td:last-child #resultBtn', row).off('click');
      $('td:last-child #resultBtn', row).on('click', () => {
        this.onEvaluate.emit(data);
      });

      $('td:last-child #evaluateBtn', row).off('click');
      $('td:last-child #evaluateBtn', row).on('click', () => {
        this.onEvaluate.emit(data);
      });

      $('td:last-child #deleteBtn', row).off('click');
      $('td:last-child #deleteBtn', row).on('click', () => {
        this.onDelete.emit(data);
      });
      
      return row;
    }
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(this.dtOptions);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  reRender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next(this.dtOptions);
    });
  }
}