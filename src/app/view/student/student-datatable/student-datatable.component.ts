import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { StudentRequest } from 'src/app/model/Request/StudentRequest';
import { StudentResponse } from 'src/app/model/Response/StudentResponse';
import { AppUtilityService } from 'src/app/service/app-utility.service';
import { InternUserService } from 'src/app/service/intern-user.service';

@Component({
  selector: 'app-student-datatable',
  templateUrl: './student-datatable.component.html',
  styleUrls: ['./student-datatable.component.css']
})
export class StudentDatatableComponent implements AfterViewInit, OnDestroy, OnInit {

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  students: StudentResponse[] = [];

  @Input() filterCampus!: string;
  @Input() filterCourse!: string;
  @Input() filterClass!: string;
  
  @Output() onUpdate = new EventEmitter<any>();
  @Output() onUpdateStatus = new EventEmitter<any>();

  constructor(private internUserService: InternUserService, private appUtilityService: AppUtilityService) {}

  ngOnInit(): void {
    this.dtOptions = {
      lengthChange: false,
      order: [[1, "asc"]],
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
        title: 'Status',
        data: ''
      }, {
        title: 'Matric Number',
        data: 'studentMatricNum'
      }, {
        title: 'Name',
        data: 'studentName'
      }, {
        title: 'Email',
        data: ''
      }, {
        title: 'Phone',
        data: 'studentPhone'
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
      let student: StudentRequest = {
        studentCampus: this.filterCampus,
        studentCourse: this.filterCourse,
        studentClass: this.filterClass,
        academicSvId: sessionStorage.getItem('userType') == 'ACD' ? sessionStorage.getItem('userId')! : '',
        industrySvId: sessionStorage.getItem('userType') == 'IND' ? sessionStorage.getItem('userId')! : ''
      };
      
      this.internUserService.filterStudents(student).subscribe({
        next: (res) => {
          if (this.appUtilityService.isObjectNotEmpty(res.data)) {
            this.students = res.data.students
          }
          
          callback({
            recordsTotal: 0,
            recordsfilter: 0,
            data: this.students
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
        className: "th-w-sm",
        render: function (data, type, row, meta) {
          let select = document.createElement('select') as HTMLSelectElement;
          select.classList.add('form-select');
          select.classList.add('form-select-sm');

          let option_def = document.createElement('option') as HTMLOptionElement;
          option_def.value = '';
          option_def.hidden = true;

          let option_ong = document.createElement('option') as HTMLOptionElement;
          option_ong.value = 'ONG';
          option_ong.innerHTML = 'ONGOING';

          let option_cmp = document.createElement('option') as HTMLOptionElement;
          option_cmp.value = 'CMP';
          option_cmp.innerHTML = 'COMPLETED';

          select.appendChild(option_def);
          select.appendChild(option_cmp);
          select.appendChild(option_ong);
          
          switch (row.studentStatus) {
            case 'ONG':
              option_ong.setAttribute('selected', 'true');
              break;
            case 'CMP':
              option_cmp.setAttribute('selected', 'true');
              break;
          }

          switch (sessionStorage.getItem('userType')) {
            case 'ACD':
              select.setAttribute('disabled', 'true');
              break;
            case 'IND':
              select.setAttribute('disabled', 'true');
              break;
          }

          if (row.studentStatus) {
            select.value = row.studentStatus;
          }

          return select.outerHTML;
        }
      }, {
        targets: 3,
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
          
          return emailButton.outerHTML + row.studentEmail;
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
          viewButton.setAttribute('href', `/dashboard/student/view/${row.studentMatricNum}`);
          viewButton.title = 'Detail';

          let viewImg = document.createElement('img') as HTMLImageElement;
          viewImg.src = '../../../../assets/icons/file-list-line.svg';
          viewImg.style.marginTop = '-2px';

          viewButton.innerHTML = viewImg.outerHTML;

          let updateButton = document.createElement('a') as HTMLAnchorElement;
          updateButton.classList.add('btn');
          updateButton.classList.add('btn-warning');
          updateButton.classList.add('btn-sm');
          updateButton.classList.add('me-1');
          updateButton.setAttribute('id', 'updateBtn');
          updateButton.title = 'Update';

          let updateImg = document.createElement('img') as HTMLImageElement;
          updateImg.src = '../../../../assets/icons/edit-line.svg';
          updateImg.style.marginTop = '-2px';

          updateButton.innerHTML = updateImg.outerHTML;

          let resultButton = document.createElement('a') as HTMLAnchorElement;
          resultButton.classList.add('btn');
          resultButton.classList.add('btn-primary');
          resultButton.classList.add('btn-sm');
          resultButton.classList.add('me-1');
          resultButton.setAttribute('href', `/dashboard/student/result/${row.studentMatricNum}`);
          resultButton.title = 'Evaluate';

          let resultImg = document.createElement('img') as HTMLImageElement;
          resultImg.src = '../../../../assets/icons/draft-line-white.svg';
          resultImg.style.marginTop = '-2px';

          resultButton.innerHTML = resultImg.outerHTML;

          switch (sessionStorage.getItem('userType')) {
            case 'COD':
              return viewButton.outerHTML + updateButton.outerHTML + resultButton.outerHTML;
              break;
            case 'ACD':
              return viewButton.outerHTML + resultButton.outerHTML;
              break;
            case 'IND':
              return viewButton.outerHTML + resultButton.outerHTML;
              break;
          }
          return '';
        }
      }
    ];

    this.dtOptions.rowCallback = (row: Node, data: any[] | Object, index: number) => {
      $('td:first-child .form-select', row).off('change');
      $('td:first-child .form-select', row).on('change', (event) => {
        let student: StudentResponse = data as StudentResponse;
        let select = event.target as HTMLSelectElement;

        let studentRequest: StudentRequest = {
          studentMatricNum: student.studentMatricNum,
          studentStatus: select.value
        }
        
        this.onUpdateStatus.emit(studentRequest);
      });

      $('td:nth-last-child(3) #emailBtn', row).off('click');
      $('td:nth-last-child(3) #emailBtn', row).on('click', () => {
        let student: StudentResponse = data as StudentResponse;
        window.open("mailto:" + student.studentEmail);
      });

      $('td:last-child #updateBtn', row).off('click');
      $('td:last-child #updateBtn', row).on('click', () => {
        this.onUpdate.emit(data);
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
      "studentMatricNum",
      "studentName",
      "studentAddress",
      "studentEmail",
      "studentPhone",
      "studentPassword",
      "studentCampus",
      "studentCourse",
      "studentClass",
      "studentProject",
      "academicSv.academicSvName",
      "industrySv.industrySvName",
      "industrySv.company.companyName"
    ];
    
    let fileHeader = [
      "Matric Number",
      "Name",
      "Address",
      "Email",
      "Phone",
      "Password",
      "Campus",
      "Course",
      "Class",
      "Project",
      "Academic Supervisor",
      "Industry Supervisor",
      "Company"
    ];
    
    this.appUtilityService.downloadCSVFile(this.students, arrayObjectHeader, fileHeader, 'Student List.csv');
  }
}
