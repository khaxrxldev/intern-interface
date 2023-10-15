import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AcademicSupervisorRequest } from 'src/app/model/Request/AcademicSupervisorRequest';
import { AcademicSupervisorResponse } from 'src/app/model/Response/AcademicSupervisorResponse';
import { AppUtilityService } from 'src/app/service/app-utility.service';
import { InternUserService } from 'src/app/service/intern-user.service';

@Component({
  selector: 'app-academic-sv-datatable',
  templateUrl: './academic-sv-datatable.component.html',
  styleUrls: ['./academic-sv-datatable.component.css']
})
export class AcademicSvDatatableComponent implements AfterViewInit, OnDestroy, OnInit {
  
  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  academicSupervisors: AcademicSupervisorResponse[] = [];

  @Input() filterCoordinator!: string;

  @Output() onUpdate = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();

  constructor(private internUserService: InternUserService, private appUtilityService: AppUtilityService) {}

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
        title: 'NAME',
        data: 'academicSvName'
      }, {
        title: 'CATEGORY',
        data: ''
      }, {
        title: 'EMAIL',
        data: ''
      }, {
        title: 'PHONE',
        data: 'academicSvPhone'
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
      let academicSupervisor: AcademicSupervisorRequest = {
        academicSvCoordinator: this.filterCoordinator ? +this.filterCoordinator : undefined
      };
      
      this.internUserService.filterAcademicSupervisors(academicSupervisor).subscribe({
        next: (res) => {
          if (this.appUtilityService.isObjectNotEmpty(res.data)) {
            this.academicSupervisors = res.data.academicSupervisors
          }
          
          callback({
            recordsTotal: 0,
            recordsfilter: 0,
            data: this.academicSupervisors
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

          switch (row.academicSvCoordinator) {
            case 0:
              span.classList.add('badge-orange');
              span.innerHTML = i.outerHTML + 'Lecturer';
              break;
            case 1:
              span.classList.add('badge-teal');
              span.innerHTML = i.outerHTML + 'Coordinator';
              break;
          }

          return span.outerHTML;
        }
      }, {
        targets: 2,
        render: function (data, type, row, meta) {
          let emailButton = document.createElement('a') as HTMLAnchorElement;
          emailButton.classList.add('btn');
          emailButton.classList.add('btn-secondary');
          emailButton.classList.add('btn-sm');
          emailButton.classList.add('me-2');
          emailButton.setAttribute('id', 'emailBtn');

          let icon = document.createElement('i') as HTMLIFrameElement;
          icon.classList.add('fa');
          icon.classList.add('fa-envelope-o');

          emailButton.innerHTML = icon.outerHTML;
          
          return emailButton.outerHTML + row.academicSvEmail;
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
          
          viewButton.setAttribute('href', `/dashboard/academic-sv/view/${row.academicSvId}`);
          viewButton.innerHTML = 'View';

          let updateButton = document.createElement('a') as HTMLAnchorElement;
          updateButton.classList.add('btn');
          updateButton.classList.add('btn-warning');
          updateButton.classList.add('btn-sm');
          updateButton.classList.add('me-1');
          
          updateButton.setAttribute('id', 'updateBtn');
          updateButton.innerHTML = 'Edit';

          let deleteButton = document.createElement('a') as HTMLAnchorElement;
          deleteButton.classList.add('btn');
          deleteButton.classList.add('btn-danger');
          deleteButton.classList.add('btn-sm');
          deleteButton.classList.add('me-1');

          deleteButton.setAttribute('id', 'deleteBtn');
          deleteButton.innerHTML = 'Delete';

          return viewButton.outerHTML + updateButton.outerHTML + deleteButton.outerHTML;
        }
      }
    ];

    this.dtOptions.rowCallback = (row: Node, data: any[] | Object, index: number) => {
      $('td:nth-last-child(3) #emailBtn', row).off('click');
      $('td:nth-last-child(3) #emailBtn', row).on('click', () => {
        let supervisor: AcademicSupervisorResponse = data as AcademicSupervisorResponse;
        window.open("mailto:" + supervisor.academicSvEmail);
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
  
  downloadTable() {
    let arrayObjectHeader = [
      "academicSvName",
      "academicSvPhone",
      "academicSvEmail",
      "academicSvPassword",
      "academicSvGender",
      "academicSvPosition"
    ];
    
    let fileHeader = [
      "Name",
      "Phone",
      "Email",
      "Password",
      "Gender",
      "Position"
    ];
    
    this.appUtilityService.downloadCSVFile(this.academicSupervisors, arrayObjectHeader, fileHeader, 'Academic Supervisor List.csv');
  }
}