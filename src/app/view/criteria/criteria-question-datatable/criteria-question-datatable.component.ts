import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { QuestionRequest } from 'src/app/model/Request/QuestionRequest';
import { QuestionResponse } from 'src/app/model/Response/QuestionResponse';
import { AppUtilityService } from 'src/app/service/app-utility.service';
import { InternCommonService } from 'src/app/service/intern-common.service';

@Component({
  selector: 'app-criteria-question-datatable',
  templateUrl: './criteria-question-datatable.component.html',
  styleUrls: ['./criteria-question-datatable.component.css']
})
export class CriteriaQuestionDatatableComponent implements AfterViewInit, OnDestroy, OnInit {
  
  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private internCommonService: InternCommonService, private appUtilityService: AppUtilityService, private activatedRoute: ActivatedRoute) {}

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
        title: 'Number',
        data: 'questionNumber'
      }, {
        title: 'Question',
        data: ''
      }, {
        title: 'Weightage',
        data: 'questionWeightage'
      }, {
        title: 'Total Mark',
        data: 'questionTotalMark'
      }],
      initComplete: function () {
        let search_input: HTMLElement = document.querySelector('.dataTables_wrapper .dataTables_filter input')!;
        search_input.classList.add('form-control', 'm-0');
      }
    };

    this.dtOptions.ajax = (dtParameters: any, callback) => {
      let question: QuestionRequest = {
        criteriaId: this.activatedRoute.snapshot.paramMap.get("criteriaId")!
      };
      let questions: QuestionResponse[] = [];
      
      this.internCommonService.filterQuestions(question).subscribe({
        next: (res) => {
          if (this.appUtilityService.isObjectNotEmpty(res.data)) {
            questions = res.data.questions
          }
          
          callback({
            recordsTotal: 0,
            recordsfilter: 0,
            data: questions
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
        className: "th-w-lg",
        render: function (data, type, row, meta) {
          let textarea = document.createElement('div') as HTMLDivElement;
          textarea.classList.add('form-control');
          textarea.classList.add('form-control-sm');
          textarea.classList.add('textarea-style');
          textarea.classList.add('h-60px');
          textarea.style.whiteSpace = 'normal';
          
          textarea.innerHTML = row.questionDesc;

          return textarea.outerHTML;
        }
      }
    ];
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