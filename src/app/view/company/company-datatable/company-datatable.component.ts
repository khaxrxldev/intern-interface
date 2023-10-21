import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { CompanyResponse } from 'src/app/model/Response/CompanyResponse';
import { AppUtilityService } from 'src/app/service/app-utility.service';
import { InternCommonService } from 'src/app/service/intern-common.service';

@Component({
  selector: 'app-company-datatable',
  templateUrl: './company-datatable.component.html',
  styleUrls: ['./company-datatable.component.css']
})
export class CompanyDatatableComponent implements AfterViewInit, OnDestroy, OnInit {
  
  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  companies: CompanyResponse[] = [];

  @Output() onUpdate = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();

  constructor(private internCommonService: InternCommonService, private appUtilityService: AppUtilityService) {}

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
        data: ''
      }, {
        title: 'PHONE',
        data: 'companyPhone'
      }, {
        title: 'HR STAFF',
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
      this.internCommonService.retrieveCompanies().subscribe({
        next: (res) => {
          if (this.appUtilityService.isObjectNotEmpty(res.data)) {
            this.companies = res.data.companies
          }
          
          callback({
            recordsTotal: 0,
            recordsfilter: 0,
            data: this.companies
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
          let infoButton = document.createElement('a') as HTMLAnchorElement;
          infoButton.classList.add('btn');
          infoButton.classList.add('btn-primary');
          infoButton.classList.add('btn-sm');
          infoButton.classList.add('me-2');
          infoButton.title = 'Website';

          infoButton.setAttribute('href', row.companyWebsite);
          infoButton.setAttribute('target', '_blank');

          let infoImg = document.createElement('img') as HTMLImageElement;
          infoImg.src = '../../../../assets/icons/share-box-line.svg';
          infoImg.style.marginTop = '-2px';

          infoButton.innerHTML = infoImg.outerHTML;
          
          if (row.companyWebsite) {
            return infoButton.outerHTML + row.companyName;
          } else {
            return row.companyName;
          }
        }
      }, {
        targets: -2,
        render: function (data, type, row, meta) {
          let emailButton = document.createElement('a') as HTMLAnchorElement;
          emailButton.classList.add('btn');
          emailButton.classList.add('btn-secondary');
          emailButton.classList.add('btn-sm');
          emailButton.classList.add('me-2');
          emailButton.setAttribute('id', 'emailBtn');
          emailButton.title = 'Email';

          let emailImg = document.createElement('img') as HTMLImageElement;
          emailImg.src = '../../../../assets/icons/mail-line.svg';
          emailImg.style.marginTop = '-2px';

          emailButton.innerHTML = emailImg.outerHTML;
          
          return emailButton.outerHTML + row.companyHrName;
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

          viewButton.setAttribute('href', `/dashboard/company/view/${row.companyId}`);
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
      $('td:nth-last-child(2) #emailBtn', row).off('click');
      $('td:nth-last-child(2) #emailBtn', row).on('click', () => {
        let company: CompanyResponse = data as CompanyResponse;
        window.open("mailto:" + company.companyHrEmail);
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
      "companyName",
      "companyAddress",
      "companyPhone",
      "companyEmail",
      "companyWebsite",
      "companyBrochureFileName",
      "companyHrName",
      "companyHrPhone",
      "companyHrEmail",
      "companyHrGender"
    ];
    
    let fileHeader = [
      "Name",
      "Address",
      "Phone",
      "Email",
      "Website",
      "Brochure File Name",
      "HR Name",
      "HR Phone",
      "HR Email",
      "HR Gender"
    ];
    
    this.appUtilityService.downloadCSVFile(this.companies, arrayObjectHeader, fileHeader, 'Company List.csv');
  }
}