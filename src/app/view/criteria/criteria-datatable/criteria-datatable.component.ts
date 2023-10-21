import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { CriteriaRequest } from 'src/app/model/Request/CriteriaRequest';
import { CriteriaResponse } from 'src/app/model/Response/CriteriaResponse';
import { AppUtilityService } from 'src/app/service/app-utility.service';
import { InternCoreService } from 'src/app/service/intern-core.service';

@Component({
  selector: 'app-criteria-datatable',
  templateUrl: './criteria-datatable.component.html',
  styleUrls: ['./criteria-datatable.component.css']
})
export class CriteriaDatatableComponent implements AfterViewInit, OnDestroy, OnInit {
  
  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  @Input() filterEvaluation!: string;

  @Output() onUpdate = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();

  constructor(private internCoreService: InternCoreService, private appUtilityService: AppUtilityService) {}

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
        data: 'criteriaName'
      }, {
        title: 'Percentage',
        data: 'criteriaPercentage'
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
      let criteria: CriteriaRequest = {
        evaluationId: this.filterEvaluation
      };
      let criterias: CriteriaResponse[] = [];
      
      this.internCoreService.filterCriterias(criteria).subscribe({
        next: (res) => {
          if (this.appUtilityService.isObjectNotEmpty(res.data)) {
            criterias = res.data.criterias
          }
          
          callback({
            recordsTotal: 0,
            recordsfilter: 0,
            data: criterias
          });
        },
        error: (err) => {
          console.log(err);
        }
      });
    };

    this.dtOptions.columnDefs = [
      {
        targets: -1,
        orderable: false,
        className: "align-center",
        render: function (data, type, row, meta) {
          let viewButton = document.createElement('a') as HTMLAnchorElement;
          viewButton.classList.add('btn');
          viewButton.classList.add('btn-info');
          viewButton.classList.add('btn-sm');
          viewButton.classList.add('me-1');
          viewButton.title = 'Detail';

          let viewImg = document.createElement('img') as HTMLImageElement;
          viewImg.src = '../../../../assets/icons/file-list-line.svg';
          viewImg.style.marginTop = '-2px';
          
          viewButton.setAttribute('href', `/dashboard/criteria/view/${row.criteriaId}`);
          viewButton.innerHTML = viewImg.outerHTML;

          let updateButton = document.createElement('a') as HTMLAnchorElement;
          updateButton.classList.add('btn');
          updateButton.classList.add('btn-warning');
          updateButton.classList.add('btn-sm');
          updateButton.classList.add('me-1');
          updateButton.title = 'Update';

          let updateImg = document.createElement('img') as HTMLImageElement;
          updateImg.src = '../../../../assets/icons/edit-line.svg';
          updateImg.style.marginTop = '-2px';
          
          updateButton.setAttribute('id', 'updateBtn');
          updateButton.innerHTML = updateImg.outerHTML;

          let deleteButton = document.createElement('a') as HTMLAnchorElement;
          deleteButton.classList.add('btn');
          deleteButton.classList.add('btn-danger');
          deleteButton.classList.add('btn-sm');
          deleteButton.classList.add('me-1');
          deleteButton.title = 'Delete';

          let deleteImg = document.createElement('img') as HTMLImageElement;
          deleteImg.src = '../../../../assets/icons/delete-bin-line.svg';
          deleteImg.style.marginTop = '-2px';

          deleteButton.setAttribute('id', 'deleteBtn');
          deleteButton.innerHTML = deleteImg.outerHTML;

          return viewButton.outerHTML + updateButton.outerHTML + deleteButton.outerHTML;
        }
      }
    ];

    this.dtOptions.rowCallback = (row: Node, data: any[] | Object, index: number) => {
      $('td:last-child #updateBtn', row).off('click');
      $('td:last-child #updateBtn', row).on('click', () => {
        this.onUpdate.emit(data);
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