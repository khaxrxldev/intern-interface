import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { SemesterRequest } from 'src/app/model/Request/SemesterRequest';
import { SemesterResponse } from 'src/app/model/Response/SemesterResponse';
import { AppUtilityService } from 'src/app/service/app-utility.service';
import { InternCommonService } from 'src/app/service/intern-common.service';

@Component({
  selector: 'app-semester-datatable',
  templateUrl: './semester-datatable.component.html',
  styleUrls: ['./semester-datatable.component.css']
})
export class SemesterDatatableComponent implements AfterViewInit, OnDestroy, OnInit {
  
  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  
  @Input() filterPart!: string;
  @Input() filterStatus!: string;

  @Output() onUpdate = new EventEmitter<any>();
  @Output() onUpdateStatus = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();

  constructor(private internCommonService: InternCommonService, private appUtilityService: AppUtilityService) {}

  ngOnInit(): void {
    this.dtOptions = {
      lengthChange: false,
      order: [[ 1, "asc" ]],
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
        title: 'Status',
        data: ''
      }, {
        title: 'Code',
        data: 'semesterCode'
      }, {
        title: 'Part',
        data: ''
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
      let semester: SemesterRequest = {
        semesterPart: this.filterPart,
        semesterStatus: this.filterStatus
      };
      let semesters: SemesterResponse[] = [];
      
      this.internCommonService.filterSemesters(semester).subscribe({
        next: (res) => {
          if (this.appUtilityService.isObjectNotEmpty(res.data)) {
            semesters = res.data.semesters
          }
          
          callback({
            recordsTotal: 0,
            recordsfilter: 0,
            data: semesters
          });
        },
        error: (err) => {
          console.log(err);
        }
      });
    };

    this.dtOptions.columnDefs = [
      {
        targets: 0,
        orderable: false,
        className: "align-center",
        render: function (data, type, row, meta) {
          let divSwitch = document.createElement('div') as HTMLDivElement;
          divSwitch.classList.add('form-check');
          divSwitch.classList.add('form-switch');
          divSwitch.classList.add('ms-4');
          divSwitch.style.transformOrigin = 'left top';
          divSwitch.style.scale = '1.5';

          let inputSwitch = document.createElement('input') as HTMLInputElement;
          inputSwitch.type = 'checkbox';
          inputSwitch.classList.add('form-check-input');

          if (row.semesterStatus == 'ACT') {
            inputSwitch.setAttribute('checked', 'checked');
          }

          divSwitch.innerHTML = inputSwitch.outerHTML;
          
          return divSwitch.outerHTML;

          // let select = document.createElement('select') as HTMLSelectElement;
          // select.classList.add('form-select');
          // select.classList.add('form-select-sm');

          // let option_def = document.createElement('option') as HTMLOptionElement;
          // option_def.value = '';
          // option_def.hidden = true;

          // let option_iac = document.createElement('option') as HTMLOptionElement;
          // option_iac.value = 'IAC';
          // option_iac.innerHTML = 'INACTIVE';

          // let option_act = document.createElement('option') as HTMLOptionElement;
          // option_act.value = 'ACT';
          // option_act.innerHTML = 'ACTIVE';

          // select.appendChild(option_def);
          // select.appendChild(option_iac);
          // select.appendChild(option_act);
          
          // switch (row.semesterStatus) {
          //   case 'IAC':
          //     option_iac.setAttribute('selected', 'true');
          //     break;
          //   case 'ACT':
          //     option_act.setAttribute('selected', 'true');
          //     break;
          // }

          // return select.outerHTML;
        }
      }, {
        targets: 2,
        orderable: false,
        render: function (data, type, row, meta) {
          switch (row.semesterPart) {
            case 'PART_6':
              return 'PART 6';
              break;
            case 'PART_7':
              return 'PART 7';
              break;
            default:
              return '';
              break;
          }
        }
      }, {
        targets: 3,
        className: "th-w-md",
        render: function (data, type, row, meta) {
          if (row.semesterStartEvaluateDate) {
            return new Date(row.semesterStartEvaluateDate).toLocaleString('en-GB', { dateStyle: "short" }).toUpperCase() + ", " + new Date(row.semesterStartEvaluateDate).toLocaleString('default', { hour12: true, timeStyle: "short" });
          } else {
            return '';
          }
        }
      }, {
        targets: 4,
        className: "th-w-md",
        render: function (data, type, row, meta) {
          if (row.semesterEndEvaluateDate) {
            return new Date(row.semesterEndEvaluateDate).toLocaleString('en-GB', { dateStyle: "short" }).toUpperCase() + ", " + new Date(row.semesterEndEvaluateDate).toLocaleString('default', { hour12: true, timeStyle: "short" });
          } else {
            return '';
          }
        }
      }, {
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
          
          viewButton.setAttribute('href', `/dashboard/semester/view/${row.semesterId}`);
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
      $('td:first-child .form-check', row).off('change');
      $('td:first-child .form-check', row).on('change', (event): any => {
        let semester: SemesterResponse = data as SemesterResponse;
        let select = event.target as HTMLInputElement;
        
        let semesterRequest: SemesterRequest = {
          semesterId: semester.semesterId,
          semesterStatus: select.checked ? "ACT" : "IAC"
        }
        
        this.onUpdateStatus.emit(semesterRequest);
      });

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