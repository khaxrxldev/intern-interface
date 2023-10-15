import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { StudentRequest } from 'src/app/model/Request/StudentRequest';
import { StudentResponse } from 'src/app/model/Response/StudentResponse';
import { AppUtilityService } from 'src/app/service/app-utility.service';
import { InternUserService } from 'src/app/service/intern-user.service';

@Component({
  selector: 'app-academic-sv-student-datatable',
  templateUrl: './academic-sv-student-datatable.component.html',
  styleUrls: ['./academic-sv-student-datatable.component.css']
})
export class AcademicSvStudentDatatableComponent implements AfterViewInit, OnDestroy, OnInit {

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private internUserService: InternUserService, private appUtilityService: AppUtilityService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.dtOptions = {
      lengthChange: false,
      order: [[0, "asc"]],
      info: false,
      pagingType: "simple",
      language: {
        "decimal": "",
        "emptyTable": "No data available in table",
        "info": "Showing _START_ to _END_ of _TOTAL_ entries",
        "infoEmpty": "Showing 0 to 0 of 0 entries",
        "infoFiltered": "(filtered from _MAX_ total entries)",
        "infoPostFix": "",
        "thousands": ",",
        "lengthMenu": "_MENU_",
        "loadingRecords": "Loading...",
        "processing": "Processing...",
        "search": "",
        "zeroRecords": "No matching records found",
        "paginate": {
          "first": "",
          "last": "",
          "next": "<i class='fa fa-chevron-right'></i>",
          "previous": "<i class='fa fa-chevron-left'></i>"
        },
        "aria": {
          "sortAscending": ": activate to sort column ascending",
          "sortDescending": ": activate to sort column descending"
        }
      },
      columns: [{
        title: 'Matric Number',
        data: 'studentMatricNum'
      }, {
        title: 'Class',
        data: 'studentClass'
      }, {
        title: 'Name',
        data: 'studentName'
      }, {
        title: 'Email',
        data: 'studentEmail'
      }, {
        title: 'Phone',
        data: 'studentPhone'
      }],
      initComplete: function () {
        let search_input: HTMLElement = document.querySelector('.dataTables_wrapper .dataTables_filter input')!;
        search_input.classList.add('form-control', 'm-0');
      }
    };

    this.dtOptions.ajax = (dtParameters: any, callback) => {
      let student: StudentRequest = {
        academicSvId: this.activatedRoute.snapshot.paramMap.get("academicSvId")!
      };
      let students: StudentResponse[] = [];
      
      this.internUserService.filterStudents(student).subscribe({
        next: (res) => {
          if (this.appUtilityService.isObjectNotEmpty(res.data)) {
            students = res.data.students
          }
          
          callback({
            recordsTotal: 0,
            recordsfilter: 0,
            data: students
          });
        },
        error: (err) => {
          console.log(err);
        }
      });
    };
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
