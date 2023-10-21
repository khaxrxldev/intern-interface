import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ApplicationRequest } from 'src/app/model/Request/ApplicationRequest';
import { ApplicationResponse } from 'src/app/model/Response/ApplicationResponse';
import { AppUtilityService } from 'src/app/service/app-utility.service';
import { InternCoreService } from 'src/app/service/intern-core.service';

@Component({
  selector: 'app-student-application-datatable',
  templateUrl: './student-application-datatable.component.html',
  styleUrls: ['./student-application-datatable.component.css']
})
export class StudentApplicationDatatableComponent implements AfterViewInit, OnDestroy, OnInit {
  
  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  @Output() onAgree = new EventEmitter<any>();
  @Output() onDisagree = new EventEmitter<any>();
  @Output() onDisplayCompany = new EventEmitter<any>();

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
        title: 'Company',
        data: 'company.companyName'
      }, {
        title: 'Date',
        data: ''
      }, {
        title: 'Company Status',
        data: ''
      }, {
        title: 'Student Status',
        data: ''
      }],
      initComplete: function () {
        let search_input: HTMLElement = document.querySelector('.dataTables_wrapper .dataTables_filter input')!;
        search_input.classList.add('form-control', 'form-control-sm', 'm-0');
      }
    };

    this.dtOptions.ajax = (dtParameters: any, callback) => {
      let application: ApplicationRequest = {
        studentMatricNum: this.activatedRoute.snapshot.paramMap.get("studentId")!
      };
      let applications: ApplicationResponse[] = [];
      
      this.internCoreService.filterApplications(application).subscribe({
        next: (res) => {
          if (this.appUtilityService.isObjectNotEmpty(res.data)) {
            applications = res.data.applications
          }
          
          callback({
            recordsTotal: 0,
            recordsfilter: 0,
            data: applications
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
        render: function (data, type, row, meta) {
          let displayButton = document.createElement('a') as HTMLAnchorElement;
          displayButton.classList.add('btn');
          displayButton.classList.add('btn-info');
          displayButton.classList.add('btn-sm');
          displayButton.classList.add('me-2');
          displayButton.setAttribute('id', 'displayBtn');
          displayButton.title = 'Information';

          let displayImg = document.createElement('img') as HTMLImageElement;
          displayImg.src = '../../../../assets/icons/file-info-line.svg';
          displayImg.style.marginTop = '-2px';

          displayButton.innerHTML = displayImg.outerHTML;
          
          return displayButton.outerHTML + row.company.companyName;
        }
      }, {
        targets: 1,
        render: function (data, type, row, meta) {
          let ISODate: Date = new Date(row.applicationDate);
          return ISODate.toLocaleString('en-GB', { dateStyle: "short", timeStyle: 'short', hour12: true }).toUpperCase();
        }
      }, {
        targets: 2,
        orderable: false,
        render: function (data, type, row, meta) {
          let span = document.createElement('span') as HTMLSpanElement;
          span.classList.add('rounded-pill');
          span.classList.add('badge-style');

          let i = document.createElement('i') as HTMLElement;
          i.classList.add('fa');
          i.classList.add('fa-circle');
          i.classList.add('me-2');

          switch (row.applicationCompStatus) {
            case 'RVW':
              span.classList.add('badge-warning');
              span.innerHTML = i.outerHTML + 'Pending';
              break;
            case 'ACP':
              span.classList.add('badge-success');
              span.innerHTML = i.outerHTML + 'Accepted';
              break;
            case 'REJ':
              span.classList.add('badge-danger');
              span.innerHTML = i.outerHTML + 'Rejected';
              break;
          }

          return span.outerHTML;
        }
      }, {
        targets: 3,
        orderable: false,
        render: function (data, type, row, meta) {
          let span = document.createElement('span') as HTMLSpanElement;
          span.classList.add('rounded-pill');
          span.classList.add('badge-style');

          let i = document.createElement('i') as HTMLElement;
          i.classList.add('fa');
          i.classList.add('fa-circle');
          i.classList.add('me-2');

          switch (row.applicationStudStatus) {
            case 'CMP':
              span.classList.add('badge-primary');
              span.innerHTML = i.outerHTML + 'Completed';
              break;
            case 'ACP':
              span.classList.add('badge-success');
              span.innerHTML = i.outerHTML + 'Accepted';
              break;
            case 'REJ':
              span.classList.add('badge-danger');
              span.innerHTML = i.outerHTML + 'Rejected';
              break;
          }

          return span.outerHTML;
        }
      }
    ];

    this.dtOptions.rowCallback = (row: Node, data: any[] | Object, index: number) => {
      $('td:nth-child(1) #displayBtn', row).off('click');
      $('td:nth-child(1) #displayBtn', row).on('click', () => {
        this.onDisplayCompany.emit(data);
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