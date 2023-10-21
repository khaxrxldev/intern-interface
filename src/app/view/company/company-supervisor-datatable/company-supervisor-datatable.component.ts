import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { IndustrySupervisorRequest } from 'src/app/model/Request/IndustrySupervisorRequest';
import { IndustrySupervisorResponse } from 'src/app/model/Response/IndustrySupervisorResponse';
import { AppUtilityService } from 'src/app/service/app-utility.service';
import { InternUserService } from 'src/app/service/intern-user.service';

@Component({
  selector: 'app-company-supervisor-datatable',
  templateUrl: './company-supervisor-datatable.component.html',
  styleUrls: ['./company-supervisor-datatable.component.css']
})
export class CompanySupervisorDatatableComponent implements AfterViewInit, OnDestroy, OnInit {
  
  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private internUserService: InternUserService, private appUtilityService: AppUtilityService, private activatedRoute: ActivatedRoute) {}

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
        data: 'industrySvName'
      }, {
        title: 'EMAIL',
        data: ''
      }, {
        title: 'PHONE',
        data: 'industrySvPhone'
      }, {
        title: 'POSITION',
        data: 'industrySvPosition'
      }],
      initComplete: function () {
        let search_input: HTMLElement = document.querySelector('.dataTables_wrapper .dataTables_filter input')!;
        search_input.classList.add('form-control', 'm-0');
      }
    };

    this.dtOptions.ajax = (dtParameters: any, callback) => {
      let industrySupervisor: IndustrySupervisorRequest = {
        companyId: this.activatedRoute.snapshot.paramMap.get("companyId")!
      };
      let industrySupervisors: IndustrySupervisorResponse[] = [];
      
      this.internUserService.filterIndustrySupervisors(industrySupervisor).subscribe({
        next: (res) => {
          if (this.appUtilityService.isObjectNotEmpty(res.data)) {
            industrySupervisors = res.data.industrySupervisors
          }
          
          callback({
            recordsTotal: 0,
            recordsfilter: 0,
            data: industrySupervisors
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
          
          return emailButton.outerHTML + row.industrySvEmail;
        }
      }
    ]
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
