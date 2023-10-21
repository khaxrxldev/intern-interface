import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ApplicationResponse } from 'src/app/model/Response/ApplicationResponse';
import { CompanyResponse } from 'src/app/model/Response/CompanyResponse';
import { AppUtilityService } from 'src/app/service/app-utility.service';
import { InternCoreService } from 'src/app/service/intern-core.service';

@Component({
  selector: 'app-application-list-datatable',
  templateUrl: './application-list-datatable.component.html',
  styleUrls: ['./application-list-datatable.component.css']
})
export class ApplicationListDatatableComponent implements AfterViewInit, OnDestroy, OnInit {
  
  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  @Output() onApply = new EventEmitter<any>();
  @Output() onDisplayCompany = new EventEmitter<any>();

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
        data: ''
      }, {
        title: 'HR Staff',
        data: 'companyHrName'
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
      let companies: CompanyResponse[] = [];
      
      this.internCoreService.retrieveApplicationByApplyStatus(false, sessionStorage.getItem('userId')!).subscribe({
        next: (res) => {
          if (this.appUtilityService.isObjectNotEmpty(res.data)) {
            companies = res.data.companies
          }
          
          callback({
            recordsTotal: 0,
            recordsfilter: 0,
            data: companies
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
          
          return displayButton.outerHTML + row.companyName;
        }
      }, {
        targets: -1,
        orderable: false,
        className: "align-center",
        render: function (data, type, row, meta) {
          let applyButton = document.createElement('a') as HTMLAnchorElement;
          applyButton.classList.add('btn');
          applyButton.classList.add('btn-primary');
          applyButton.classList.add('btn-sm');

          applyButton.setAttribute('id', 'applyBtn');
          applyButton.title = 'Apply';

          let applyImg = document.createElement('img') as HTMLImageElement;
          applyImg.src = '../../../../assets/icons/mail-add-line.svg';
          applyImg.style.marginTop = '-2px';

          applyButton.innerHTML = applyImg.outerHTML;

          if (row.companyApplyBtn) {
            return applyButton.outerHTML;
          } else {
            return '';
          }
        }
      }
    ];

    this.dtOptions.rowCallback = (row: Node, data: any[] | Object, index: number) => {
      $('td:nth-child(1) #displayBtn', row).off('click');
      $('td:nth-child(1) #displayBtn', row).on('click', () => {
        this.onDisplayCompany.emit(data);
      });

      $('td:last-child #applyBtn', row).off('click');
      $('td:last-child #applyBtn', row).on('click', () => {
        this.onApply.emit(data);
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