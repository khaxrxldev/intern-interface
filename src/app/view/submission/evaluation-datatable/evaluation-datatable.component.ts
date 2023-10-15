import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { StudentEvaluationRequest } from 'src/app/model/Request/StudentEvaluationRequest';
import { StudentEvaluationResponse } from 'src/app/model/Response/StudentEvaluationResponse';
import { AppUtilityService } from 'src/app/service/app-utility.service';
import { InternCoreService } from 'src/app/service/intern-core.service';

@Component({
  selector: 'app-evaluation-datatable',
  templateUrl: './evaluation-datatable.component.html',
  styleUrls: ['./evaluation-datatable.component.css']
})
export class EvaluationDatatableComponent implements AfterViewInit, OnDestroy, OnInit {
  
  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

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
      },{
        title: 'Category',
        data: ''
      }, {
        title: 'Start Date',
        data: ''
      }, {
        title: 'End Date',
        data: ''
      }, {
        title: 'Attachment',
        data: 'studentEvaluationAttachFileName'
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
        studentMatricNum: sessionStorage.getItem('userId')!
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
        render: function (data, type, row, meta) {
          let span = document.createElement('span') as HTMLSpanElement;
          span.classList.add('rounded-pill');
          span.classList.add('badge-style');

          let i = document.createElement('i') as HTMLElement;
          i.classList.add('fa');
          i.classList.add('fa-circle');
          i.classList.add('me-2');

          switch (row.evaluation.evaluationCategory) {
            case 'ACD':
              span.classList.add('badge-orange');
              span.innerHTML = i.outerHTML + 'Academic';
              break;
            case 'IND':
              span.classList.add('badge-purple');
              span.innerHTML = i.outerHTML + 'Industry';
              break;
            case 'COD':
              span.classList.add('badge-teal');
              span.innerHTML = i.outerHTML + 'Coordinator';
              break;
          }

          return span.outerHTML;
        }
      }, {
        targets: 2,
        render: function (data, type, row, meta) {
          let ISODate: Date = new Date(row.studentEvaluationStartDate);
          return ISODate.toLocaleString('en-GB', { dateStyle: "short", timeStyle: 'short', hour12: true }).toUpperCase();
        }
      }, {
        targets: 3,
        render: function (data, type, row, meta) {
          let ISODate: Date = new Date(row.studentEvaluationEndDate);
          return ISODate.toLocaleString('en-GB', { dateStyle: "short", timeStyle: 'short', hour12: true }).toUpperCase();
        }
      }, {
        targets: -1,
        orderable: false,
        className: "align-center",
        render: function (data, type, row, meta) {
          let div = document.createElement('div') as HTMLDivElement;
          div.classList.add('input-group');
          div.classList.add('input-group-sm');

          let input = document.createElement('input') as HTMLInputElement;
          input.setAttribute('type', 'file');
          input.setAttribute('id', 'uploadAttch');
          input.classList.add('form-control');

          let button = document.createElement('button') as HTMLButtonElement;
          button.classList.add('input-group-text');
          button.setAttribute('id', 'btnAttch');
          
          let i = document.createElement('i') as HTMLElement;
          i.classList.add('fa');
          i.classList.add('fa-expand');
          i.classList.add('fw-bold');

          button.innerHTML = i.outerHTML;

          if (row.studentEvaluationAttach) {
            div.innerHTML = input.outerHTML + button.outerHTML;
          } else {
            div.innerHTML = input.outerHTML;
          }

          return div.outerHTML;
        }
      }
    ];

    this.dtOptions.rowCallback = (row: Node, data: any[] | Object, index: number) => {
      $('td:last-child #btnAttch', row).off('click');
      $('td:last-child #btnAttch', row).on('click', (event: any) => {
        let studentEvaluation: StudentEvaluationResponse = data as StudentEvaluationResponse;
        this.appUtilityService.onDisplayFile(studentEvaluation.studentEvaluationAttach!);
      });

      $('td:last-child #uploadAttch', row).off('change');
      $('td:last-child #uploadAttch', row).on('change', (event: any) => {
        let studentEvaluation: StudentEvaluationResponse = data as StudentEvaluationResponse;
        this.onUpdateStudentEvaluation(studentEvaluation, event.target.files[0]);
      });
      
      return row;
    }
  }

  onUpdateStudentEvaluation(studentEvaluation: StudentEvaluationRequest, attachFile: File) {
    this.internCoreService.updateStudentEvaluation(studentEvaluation, attachFile).subscribe({
      next: (res) => {
        if (this.appUtilityService.isObjectNotEmpty(res.data)) {
          this.reRender();
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
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